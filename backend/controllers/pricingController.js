const TravelRoute = require('../models/TravelRoute');
const VehicleCategory = require('../models/VehicleCategory');
const PricingVehicle = require('../models/PricingVehicle');
const PricingRule = require('../models/PricingRule');
const Offer = require('../models/Offer');

// ─────────────────────────────────────────────
// PUBLIC ENDPOINTS (Customer Fare Calculator)
// ─────────────────────────────────────────────

// GET /api/pricing/routes — list active routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await TravelRoute.find({ active: true }).sort({ sourceCity: 1, destinationCity: 1 });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching routes', error: err.message });
  }
};

// GET /api/pricing/categories — list active vehicle categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await VehicleCategory.find({ active: true }).sort({ displayOrder: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

// GET /api/pricing/vehicles — list active vehicles, optionally filtered by category
exports.getVehicles = async (req, res) => {
  try {
    const filter = { active: true };
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }
    const vehicles = await PricingVehicle.find(filter).populate('categoryId', 'name').sort({ name: 1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

// POST /api/pricing/calculate — calculate fare
exports.calculateFare = async (req, res) => {
  try {
    const { routeId, vehicleId, acType } = req.body;

    if (!routeId || !vehicleId || !acType) {
      return res.status(400).json({ message: 'routeId, vehicleId, and acType are required' });
    }

    // 1. Fetch route
    const route = await TravelRoute.findById(routeId);
    if (!route || !route.active) {
      return res.status(404).json({ message: 'Route not found or inactive' });
    }

    // 2. Fetch vehicle + category
    const vehicle = await PricingVehicle.findById(vehicleId).populate('categoryId', 'name');
    if (!vehicle || !vehicle.active) {
      return res.status(404).json({ message: 'Vehicle not found or inactive' });
    }

    // 3. Fetch pricing rule for this vehicle
    const pricingRule = await PricingRule.findOne({ vehicleId: vehicle._id, active: true });
    if (!pricingRule) {
      return res.status(404).json({ message: 'No pricing rule found for this vehicle' });
    }

    // 4. Calculate fare
    const distanceKm = route.distanceKm;
    let baseFare = distanceKm * pricingRule.basePricePerKm;
    let acSurcharge = 0;

    if (acType === 'AC' && pricingRule.acSurchargePerKm > 0) {
      acSurcharge = distanceKm * pricingRule.acSurchargePerKm;
    }

    const marketFare = Math.round(baseFare + acSurcharge);

    // 5. Find best active offer
    const now = new Date();
    const activeOffers = await Offer.find({
      active: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).sort({ discountPercentage: -1 });

    let discountPercentage = 0;
    let offerName = '';
    if (activeOffers.length > 0) {
      discountPercentage = activeOffers[0].discountPercentage;
      offerName = activeOffers[0].name;
    }

    const savings = Math.round(marketFare * (discountPercentage / 100));
    const finalFare = marketFare - savings;

    res.json({
      route: {
        sourceCity: route.sourceCity,
        destinationCity: route.destinationCity,
        distanceKm: route.distanceKm
      },
      vehicle: {
        name: vehicle.name,
        category: vehicle.categoryId?.name || 'N/A',
        maxTravellers: vehicle.maxTravellers,
        maxSeats: vehicle.maxSeats
      },
      acType,
      marketFare,
      discountPercentage,
      offerName,
      savings,
      finalFare
    });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating fare', error: err.message });
  }
};

// ─────────────────────────────────────────────
// ADMIN CRUD ENDPOINTS (Protected by clerkAuth)
// ─────────────────────────────────────────────

// --- Routes CRUD ---
exports.adminGetRoutes = async (req, res) => {
  try {
    const routes = await TravelRoute.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching routes', error: err.message });
  }
};

exports.adminCreateRoute = async (req, res) => {
  try {
    const route = new TravelRoute(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This route already exists' });
    }
    res.status(500).json({ message: 'Error creating route', error: err.message });
  }
};

exports.adminUpdateRoute = async (req, res) => {
  try {
    const route = await TravelRoute.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: 'Error updating route', error: err.message });
  }
};

exports.adminDeleteRoute = async (req, res) => {
  try {
    const route = await TravelRoute.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting route', error: err.message });
  }
};

// --- Vehicle Categories CRUD ---
exports.adminGetCategories = async (req, res) => {
  try {
    const categories = await VehicleCategory.find().sort({ displayOrder: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

exports.adminCreateCategory = async (req, res) => {
  try {
    const category = new VehicleCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Category with this name already exists' });
    }
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};

exports.adminUpdateCategory = async (req, res) => {
  try {
    const category = await VehicleCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

exports.adminDeleteCategory = async (req, res) => {
  try {
    const category = await VehicleCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};

// --- Vehicles CRUD ---
exports.adminGetVehicles = async (req, res) => {
  try {
    const vehicles = await PricingVehicle.find().populate('categoryId', 'name').sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

exports.adminCreateVehicle = async (req, res) => {
  try {
    const vehicle = new PricingVehicle(req.body);
    await vehicle.save();
    const populated = await vehicle.populate('categoryId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Error creating vehicle', error: err.message });
  }
};

exports.adminUpdateVehicle = async (req, res) => {
  try {
    const vehicle = await PricingVehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('categoryId', 'name');
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vehicle', error: err.message });
  }
};

exports.adminDeleteVehicle = async (req, res) => {
  try {
    const vehicle = await PricingVehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    // Also clean up associated pricing rules
    await PricingRule.deleteMany({ vehicleId: vehicle._id });
    res.json({ message: 'Vehicle and associated pricing rules deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vehicle', error: err.message });
  }
};

// --- Pricing Rules CRUD ---
exports.adminGetPricingRules = async (req, res) => {
  try {
    const rules = await PricingRule.find().populate('vehicleId', 'name').sort({ createdAt: -1 });
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pricing rules', error: err.message });
  }
};

exports.adminCreatePricingRule = async (req, res) => {
  try {
    const rule = new PricingRule(req.body);
    await rule.save();
    const populated = await rule.populate('vehicleId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Error creating pricing rule', error: err.message });
  }
};

exports.adminUpdatePricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('vehicleId', 'name');
    if (!rule) return res.status(404).json({ message: 'Pricing rule not found' });
    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: 'Error updating pricing rule', error: err.message });
  }
};

exports.adminDeletePricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.findByIdAndDelete(req.params.id);
    if (!rule) return res.status(404).json({ message: 'Pricing rule not found' });
    res.json({ message: 'Pricing rule deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pricing rule', error: err.message });
  }
};

// --- Offers CRUD ---
exports.adminGetOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching offers', error: err.message });
  }
};

exports.adminCreateOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: 'Error creating offer', error: err.message });
  }
};

exports.adminUpdateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: 'Error updating offer', error: err.message });
  }
};

exports.adminDeleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting offer', error: err.message });
  }
};
