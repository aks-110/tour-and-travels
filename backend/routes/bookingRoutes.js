const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const clerkAuth = require('../middleware/clerkAuth');

// Public/User Booking Routes
router.post('/create-order', bookingController.createOrder);
router.post('/verify', bookingController.verifyPayment);

// Admin Protected Routes
const adminRouter = express.Router();
adminRouter.use(clerkAuth);

adminRouter.get('/all', bookingController.adminGetBookings);
adminRouter.post('/:id/confirm', bookingController.adminConfirmBooking);
adminRouter.post('/:id/cancel', bookingController.adminCancelBooking);

adminRouter.get('/settings', bookingController.adminGetSettings);
adminRouter.put('/settings', bookingController.adminUpdateSettings);

router.use('/admin', adminRouter);

module.exports = router;
