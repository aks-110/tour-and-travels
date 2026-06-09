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
const adminRouter = express.Router();
adminRouter.use(clerkAuth);

// Routes management
adminRouter.get('/routes', pc.adminGetRoutes);
adminRouter.post('/routes', pc.adminCreateRoute);
adminRouter.put('/routes/:id', pc.adminUpdateRoute);
adminRouter.delete('/routes/:id', pc.adminDeleteRoute);

// Vehicle categories
adminRouter.get('/categories', pc.adminGetCategories);
adminRouter.post('/categories', pc.adminCreateCategory);
adminRouter.put('/categories/:id', pc.adminUpdateCategory);
adminRouter.delete('/categories/:id', pc.adminDeleteCategory);

// Vehicles
adminRouter.get('/vehicles', pc.adminGetVehicles);
adminRouter.post('/vehicles', pc.adminCreateVehicle);
adminRouter.put('/vehicles/:id', pc.adminUpdateVehicle);
adminRouter.delete('/vehicles/:id', pc.adminDeleteVehicle);

// Pricing rules
adminRouter.get('/pricing-rules', pc.adminGetPricingRules);
adminRouter.post('/pricing-rules', pc.adminCreatePricingRule);
adminRouter.put('/pricing-rules/:id', pc.adminUpdatePricingRule);
adminRouter.delete('/pricing-rules/:id', pc.adminDeletePricingRule);

// Offers
adminRouter.get('/offers', pc.adminGetOffers);
adminRouter.post('/offers', pc.adminCreateOffer);
adminRouter.put('/offers/:id', pc.adminUpdateOffer);
adminRouter.delete('/offers/:id', pc.adminDeleteOffer);

// Mount the admin router
router.use('/admin', adminRouter);

module.exports = router;
