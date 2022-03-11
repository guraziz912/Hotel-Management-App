//stripe setup
const stripe = require('stripe')(process.env.STRIPE_KEY);

const bookingSevice = require('../service/bookingService');
// response handler
const responseHandler = require('../utils/responseHandler');
// Success messages
const successMessages = require('../messages/success/index');
// Failure messages
const failureMessages = require('../messages/error/index');
const CustomError = require('../middlewares/error');

const customError = new CustomError();

// Constants
const constants = require('../utils/constants');

// Add a booking
exports.addBooking = async (req, res, next) => {
  const lang = req.body.headers['accept-language'];

  try {
    const addedBooking = await bookingSevice.addBooking(req.body);
    if (!addedBooking) {
      return responseHandler.faliedAuthResponse(
        res,
        constants.unauthorizeStatusCode,
        failureMessages[lang].bookingNotAdded
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].bookingSuccess,
      addedBooking
    );
  } catch (error) {
    next(error);
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res, next) => {
  const { lang } = req.headers['accept-language'];

  try {
    const canceledBooking = await bookingSevice.deleteBooking(req.body);
    if (canceledBooking !== 1) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].bookingNotCanceled
      );
    }
    return responseHandler.successResponse(
      res,
      constants.successStatusCode,
      successMessages[lang].bookingCanceledSuccess
    );
  } catch (error) {
    next(error);
  }
};

// stripe checkout
exports.checkOutPayment = async (req, res, next) => {
  const lang = req.body.headers['accept-language'];
  const { email, totalPrice } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'inr',
      metadata: { integration_check: 'accept_a_payment' },
      receipt_email: email,
    });

    return res.json({
      success: true,
      client_secret: paymentIntent['client_secret'],
    });
  } catch (error) {
    next(error);
  }
};
