import { configureStore } from '@reduxjs/toolkit';

import { hotelReducer } from '../components/Hotels/hotelSlice';
import { bookingReducer } from '../components/Booking/bookingSlice';
import { userReducer } from '../components/User/userSlice';
import { notificationReducer } from '../components/Notifications/notificationSlice';

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    booking: bookingReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});
export default store;
