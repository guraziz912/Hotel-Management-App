/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RoomIcon from '@material-ui/icons/Room';

import CustomCard from '../UI/CustomCard';
import { numberOfNights } from '../../utils/helperFunctions';
import GuestInfo from '../User/GuestInfo';

import classes from './HotelBookingDetail.module.css';
import schemaContants from '../../utils/schemaContants';
import constants from '../../utils/constants';

const hotelBooking = (props) => {
  const selectedHotel = useSelector(
    (state) => state.hotels.masterData.selectedHotel
  );
  const bookingData = useSelector((state) => state.booking.bookingData);
  const { checkIn, checkOut, totalPrice, adults, rooms } = bookingData;

  return (
    <Fragment>
      <section className={classes.backgroundSection}></section>
      <Container className={classes.bookingContainer}>
        <Row>
          <Col
            md={{
              span: schemaContants.bookingDetailColSpan,
              offset: schemaContants.bookingDetailColOffset,
            }}
          >
            <div className={classes.bookingInfo}>
              <strong>{constants.hotelInfo}</strong>
            </div>
            <CustomCard
              type={constants.customCardTypeFilter}
              className={classes.bookingDetailCard}
            >
              <div>
                <img
                  alt={selectedHotel.hotelName}
                  src={selectedHotel.image}
                  className={classes.hotelImage}
                />
              </div>
              <div className={classes.hotelDetail}>
                <span>
                  <strong>{selectedHotel.hotelName}</strong>
                </span>
                <span>
                  <RoomIcon />
                  {selectedHotel.location}
                </span>
                <span>{selectedHotel.city}</span>
              </div>
              <div className={classes.bookingDetail}>
                <span>
                  <strong>{constants.checkInDetail}</strong>
                  <div>{new Date(checkIn).toDateString()}</div>
                </span>
                <span>
                  <strong> {constants.checkOutDetail} </strong>
                  <div>{new Date(checkOut).toDateString()}</div>
                </span>
                <span>
                  <strong> {constants.guestDetail} </strong>
                  <div>{`${adults} Guests | ${rooms}Rooms`}</div>
                </span>
              </div>
            </CustomCard>
            <div className={classes.guestDetailContainer}>
              <div className={classes.bookingInfo}>
                <strong>{constants.guestInfo}</strong>
              </div>
              <GuestInfo />
            </div>
          </Col>
          <Col
            md={{
              span: schemaContants.priceInfoColSpan,
              offset: schemaContants.priceInfoColOffset,
            }}
            className={classes.priceInfoContainer}
          >
            <div className={classes.priceSummaryHeader}>
              <strong>{constants.priceSummary}</strong>
            </div>
            <CustomCard
              type={constants.customCardTypeFilter}
              className={classes.priceSummaryCard}
            >
              <div className={classes.priceSummaryTable}>
                <span>{`Room Charges (${rooms} room x ${numberOfNights(
                  checkIn,
                  checkOut
                )} night)`}</span>
                <span className={classes.priceSection}>{`₹${totalPrice}`}</span>
              </div>
              <div className={classes.priceSummaryTable}>
                <span>{constants.numberOfGuests}</span>
                <span className={classes.priceSection}>{`${adults}`}</span>
              </div>
              <div className={classes.totalPriceBox}></div>
              <div className={classes.priceSummaryTable}>
                <span>
                  <strong>{constants.payNow}</strong>
                </span>
                <span className={classes.priceSection}>{`₹${totalPrice}`}</span>
              </div>
            </CustomCard>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default hotelBooking;
