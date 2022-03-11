/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { hotelActions } from '../../Hotels/hotelSlice';
import DatePicker from '../../UI/DatePicker';
import AutocompleteBox from '../../UI/AutocompleteBox';
import { fetchSearchedCityData } from '../../Hotels/hotel_Actions';
import Guests from '../../Booking/Guests';
import { bookingActions } from '../../Booking/bookingSlice';

import classes from './SearchNavBar.module.css';
import constants from '../../../utils/constants';

const searchNavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useSelector((state) => state.hotels.searchFilterData);
  const checkInDate = useSelector((state) => state.booking.masterData.checkIn);
  const checkOutDate = useSelector(
    (state) => state.booking.masterData.checkOut
  );
  const searchedCity = useSelector(
    (state) => state.hotels.masterData.searchedCity
  );
  const bookingData = useSelector((state) => state.booking.masterData);
  const { totalAdults, totalRooms } = bookingData;

  const searchCityHandler = (event) => {
    if (event.target.value !== '') {
      dispatch(fetchSearchedCityData(event.target.value));
    } else {
      dispatch(hotelActions.replaceSearchFilterData([]));
    }
  };

  // city handler
  const cityHandler = (event) => {
    dispatch(hotelActions.setSearchedCity(event.target.value));
  };
  // checkin date handler
  const checkInHandler = (event) => {
    dispatch(bookingActions.setCheckIn(event.target.value));
  };

  //checkout date handler
  const checkOutHandler = (event) => {
    dispatch(bookingActions.setCheckOut(event.target.value));
  };

  //update search handler
  const updateSearchHandler = () => {
    history.push(`/hotels/${searchedCity}`);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
  };
  const guestAndRoomHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  return (
    <Fragment>
      <Navbar bg={constants.navbarBg} variant={constants.navbarVariant}>
        <Nav className={constants.navbarClassName}>
          <div>
            <label className={classes.navInputlabel}>{constants.city}</label>
            <span>
              <AutocompleteBox
                location={location}
                onSelect={cityHandler}
                onChange={searchCityHandler}
                city={searchedCity}
              />
            </span>
          </div>

          <div className={classes.navInputBox}>
            <label className={classes.navInputlabel}>
              {constants.checkInDetail}
            </label>
            <div>
              <DatePicker value={checkInDate} onChange={checkInHandler} />
            </div>
          </div>
          <div className={classes.navInputBox}>
            <label className={classes.navInputlabel}>
              {constants.checkOutDetail}
            </label>
            <div>
              <DatePicker
                value={checkOutDate}
                onChange={checkOutHandler}
                minDate={checkInDate}
              />
            </div>
          </div>
          <div className={classes.navInputBox}>
            <label className={classes.navInputlabel}>
              {constants.guestsAndRooms}
            </label>
            <div>
              <input
                type={constants.inputTypeText}
                onClick={guestAndRoomHandler}
                value={`${totalAdults} Guests in ${totalRooms} Rooms`}
              />
              <Guests open={open} anchorEl={anchorEl} onClose={handleClose} />
            </div>
          </div>
          <Button
            className={classes.navButton}
            variant={constants.updateSearchButtonVariant}
            onClick={updateSearchHandler}
          >
            {constants.updateSearch}
          </Button>
        </Nav>
      </Navbar>
    </Fragment>
  );
};
export default searchNavBar;
