const express = require('express');
const router = express.Router();
const pc = require('../controllers/pricingController');
const clerkAuth = require('../middleware/clerkAuth');

// ─────────────────────────────────────────
// PUBLIC ROUTES (Customer Fare Calculator)
// ─────────────────────────────────────────
router.get('/routes', pc.getRoutes);
router.get('/categories', pc.getCategories);
router.get('/vehicles', pc.getVehicles);
router.post('/calculate', pc.calculateFare);

// ─────────────────────────────────────────
// ADMIN ROUTES (Protected by Clerk Auth)
// ─────────────────────────────────────────
router.use('/admin', clerkAuth);

// Routes management
router.get('/admin/routes', pc.adminGetRoutes);
router.post('/admin/routes', pc.adminCreateRoute);
router.put('/admin/routes/:id', pc.adminUpdateRoute);
router.delete('/admin/routes/:id', pc.adminDeleteRoute);

// Vehicle categories
router.get('/admin/categories', pc.adminGetCategories);
router.post('/admin/categories', pc.adminCreateCategory);
router.put('/admin/categories/:id', pc.adminUpdateCategory);
router.delete('/admin/categories/:id', pc.adminDeleteCategory);

// Vehicles
router.get('/admin/vehicles', pc.adminGetVehicles);
router.post('/admin/vehicles', pc.adminCreateVehicle);
router.put('/admin/vehicles/:id', pc.adminUpdateVehicle);
router.delete('/admin/vehicles/:id', pc.adminDeleteVehicle);

// Pricing rules
router.get('/admin/pricing-rules', pc.adminGetPricingRules);
router.post('/admin/pricing-rules', pc.adminCreatePricingRule);
router.put('/admin/pricing-rules/:id', pc.adminUpdatePricingRule);
router.delete('/admin/pricing-rules/:id', pc.adminDeletePricingRule);

// Offers
router.get('/admin/offers', pc.adminGetOffers);
router.post('/admin/offers', pc.adminCreateOffer);
router.put('/admin/offers/:id', pc.adminUpdateOffer);
router.delete('/admin/offers/:id', pc.adminDeleteOffer);

module.exports = router;
