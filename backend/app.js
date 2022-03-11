const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const logger = require('./logger/logger');

// Controllers
const User = require('./models/users');
const HotelAmenities = require('./models/hotelAmenities');
const Hotels = require('./models/hotels');
const Rooms = require('./models/rooms');
const HotelPolicies = require('./models/hotelPolicies');
const staticData = require('./models/staticData');
const Amenities = require('./models/amenities');
const DiscoutCoupons = require('./models/discountCoupons');
const Cities = require('./models/cities');
const Bookings = require('./models/bookings');
const HotelReviews = require('./models/hotelReviews');

// Routes
const userRoutes = require('./routes/authenticationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const citiesRoutes = require('./routes/citiesRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const masterDataRoutes = require('./routes/masterDataRoute');

const constants = require('./utils/constants');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: constants.tracesSampleRate,
});

app.use(express.json());

app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use('/user', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/location', citiesRoutes);
app.use('/booking', bookingRoutes);
app.use(masterDataRoutes);
app.use(
  '/assets/uploadedFiles',
  express.static(path.join(__dirname, '../assets/uploadedFiles'))
);
// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// Exception handler
process.on('uncaughtException', (err) => {
  logger.error(err);
});

// Common Error Handler
app.use((error, req, res, next) => {
  logger.error(error);
  const status = error.statusCode || constants.genericErrorStatusCode;
  res.status(status).json({
    success: false,
    message: error.message,
  });
});

// Associations of hotels with rooms, hotel policies and amenities table
HotelPolicies.belongsTo(Hotels, { constraint: true, onDelete: 'CASCADE' });
Hotels.hasMany(HotelPolicies);
Rooms.belongsTo(Hotels, { constraint: true, onDelete: 'CASCADE' });
Hotels.hasMany(Rooms);
HotelAmenities.belongsTo(Hotels, { constraint: true, onDelete: 'CASCADE' });
Hotels.hasMany(HotelAmenities);
HotelReviews.belongsTo(Hotels, { constraint: true, onDelete: 'CASCADE' });
Hotels.hasMany(HotelReviews);
Hotels.sequelize.sync();

Amenities.sequelize.sync();
DiscoutCoupons.sequelize.sync();
staticData.sequelize.sync();
Bookings.sequelize.sync();
Cities.sequelize.sync();
HotelReviews.belongsTo(User, { constraint: true, onDelete: 'CASCADE' });
User.hasMany(HotelReviews);

User.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    logger.error(error);
  });
