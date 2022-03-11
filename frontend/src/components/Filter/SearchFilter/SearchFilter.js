import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import CustomCard from '../../UI/CustomCard';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { hotelActions } from '../../Hotels/hotelSlice';
import DatePicker from '../../UI/DatePicker';
import AutocompleteBox from '../../UI/AutocompleteBox';
import { fetchSearchedCityData } from '../../Hotels/hotel_Actions';
import { bookingActions } from '../../Booking/bookingSlice';
import Guests from '../../Booking/Guests';

import classes from './SearchFilter.module.css';
import constants from '../../../utils/constants';

const SearchFilter = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useSelector((state) => state.hotels.searchFilterData);
  const searchedCity = useSelector(
    (state) => state.hotels.masterData.searchedCity
  );

  const bookingData = useSelector((state) => state.booking.masterData);
  const { totalAdults, totalRooms, checkIn, checkOut } = bookingData;

  const handleCheckInDate = (event) => {
    dispatch(bookingActions.setCheckIn(event.target.value));
  };

  const handleCheckOutDate = (event) => {
    dispatch(bookingActions.setCheckOut(event.target.value));
  };

  const searchHandler = () => {
    if (searchedCity !== null) {
      history.push(`/hotels/${searchedCity}`);
    }
  };

  const searchCityHandler = (event) => {
    console.log(event.target.value !== '');
    if (event.target.value !== '') {
      dispatch(fetchSearchedCityData(event.target.value));
    } else {
      dispatch(hotelActions.replaceSearchFilterData([]));
    }
  };

  const cityHandler = (event) => {
    dispatch(hotelActions.setSearchedCity(event.target.value));
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
    <div>
      <CustomCard
        type={constants.customCardTypeFilter}
        className={classes.searchBox}
      >
        <div className={classes.searchCityContainer}>
          <label>Where :</label>
          <AutocompleteBox
            location={location}
            onSelect={cityHandler}
            onChange={searchCityHandler}
          />
        </div>
        <br></br>
        <Container>
          <Row className={classes.bookingDateRow}>
            <Col>
              <label>{constants.checkInDetail}</label>
              <div>
                <DatePicker
                  className={classes.bookingDateInput}
                  value={checkIn}
                  onChange={handleCheckInDate}
                  animateYearScrolling
                />
              </div>
            </Col>
            <Col>
              <label>{constants.checkOutDetail}</label>
              <div>
                <DatePicker
                  className={classes.bookingDateInput}
                  value={checkOut}
                  onChange={handleCheckOutDate}
                  animateYearScrolling
                />
              </div>
            </Col>
          </Row>
        </Container>
        <div className={classes.guestAndRoomContainer}>
          <label>{constants.guestsAndRooms}</label>
          <div>
            <input
              className={classes.guestAndRoomInput}
              type="text"
              onClick={guestAndRoomHandler}
              value={`${totalAdults} Guests in ${totalRooms} Rooms`}
            />
            <Guests open={open} anchorEl={anchorEl} onClose={handleClose} />
          </div>
        </div>
      </CustomCard>
      <div className={classes.searchButton}>
        <Button
          onClick={searchHandler}
          variant={constants.paymentButtonVariant}
          size={constants.buttonSizeLarge}
          color={constants.paymentButtonColor}
        >
          {constants.searchHotels}
        </Button>
      </div>
    </div>
  );
};
export default SearchFilter;
