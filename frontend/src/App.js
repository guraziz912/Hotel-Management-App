import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  fetchAmenities,
  fetchStaticData,
} from './components/Hotels/hotel_Actions';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Hotels from './components/Hotels/Hotels';
import HotelDetail from './components/Hotels/HotelDetail';
import HotelBookingDetail from './components/Booking/HotelBookingDetail';
import UserProfile from './components/User/UserProfile';
import AboutCompany from './components/StaticPages/AboutCompany';
import { userActions } from './components/User/userSlice';
import { bookingActions } from './components/Booking/bookingSlice';
import TermsAndConditions from './components/StaticPages/TermsAndConditions';
import CheckOutForm from './components/Booking/StripeCheckout/CheckOutForm';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const loginStatus = useSelector(
    (state) => state.user.masterData.userLoginStatus
  );
  const bookingStatus = useSelector(
    (state) => state.booking.masterData.bookingStatus
  );

  //setting alertBox
  useEffect(() => {
    if (loginStatus) {
      setTimeout(() => {
        dispatch(userActions.setUserLoginAlert());
      }, 5000);
    }
    if (bookingStatus) {
      setTimeout(() => {
        dispatch(bookingActions.setBookingStatus());
      });
    }
  }, [loginStatus, dispatch, bookingStatus]);

  // fetching all static data
  useEffect(() => {
    dispatch(fetchAmenities());
    dispatch(fetchStaticData());
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path={'/aboutCompany'} component={AboutCompany} exact />
          <Route
            path={'/termsAndConditons'}
            component={TermsAndConditions}
            exact
          />

          <Route path={`/checkout`} component={CheckOutForm} exact />
          <Route path={`/hotels/:searchedCity`} component={Hotels} exact />
          <Route
            path={`/hotels/:searchedCity/:hotelName`}
            component={HotelDetail}
            exact
          />
          <Route path={`/booking`} component={HotelBookingDetail} exact />
          <Route path={`/:username`} component={UserProfile} exact />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
