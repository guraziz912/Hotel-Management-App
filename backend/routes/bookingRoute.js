const express = require('express');

const bookingController = require('../controller/bookings');

const bookingRouter = express.Router();

// add booking
bookingRouter.post('/addBooking', bookingController.addBooking);

// cancel booking
bookingRouter.delete('/cancelBooking', bookingController.cancelBooking);

// payment checkout
bookingRouter.post('/checkout', bookingController.checkOutPayment);
module.exports = bookingRouter;
