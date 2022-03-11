/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from 'react-router-dom';

import { Table, Button, Container, Row } from 'react-bootstrap';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import classes from './HotelRooms.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { bookingActions } from '../Booking/bookingSlice';
import { numberOfNights } from '../../utils/helperFunctions';
import constants from '../../utils/constants';

const hotelRooms = ({ rooms, hotelName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    checkIn,
    checkOut,
    totalAdults,
    totalRooms,
    totalChildren,
  } = useSelector((state) => state.booking.masterData);
  console.log();
  const hotelRoomsHandler = (roomName, price) => {
    const totalRoomPrice = price * numberOfNights(checkIn, checkOut);
    const hotelDetail = {
      hotelName: hotelName,
      roomType: roomName,
      totalPrice: totalRoomPrice,
      rooms: totalRooms,
      adults: totalAdults,
      children: totalChildren,
    };
    if (checkIn !== null && checkOut !== null) {
      dispatch(bookingActions.setHotelInfo(hotelDetail));
      history.push(`/booking`);
    }
  };

  const hotelRooms = rooms.map(
    ({ type, image, roomOptions, roomInclusions, price }) => {
      return (
        <tr className={classes.tableCol}>
          <td>
            <div>
              <strong>{type}</strong>
            </div>
            <img className={classes.roomImage} src={image} alt={type} />
          </td>
          <td className={classes.roomOptions}>
            <CancelPresentationIcon />
            &emsp;
            {roomOptions}
          </td>
          <td>
            <CheckCircleIcon />
            &emsp;{roomInclusions}
          </td>
          <td>
            <div>
              ${price}
              <span>{constants.perNight}</span>
            </div>
            <div className={classes.button}>
              <Button
                variant={constants.selectRoomButtonVariant}
                size={constants.selectRoomButtonSize}
                onClick={() => {
                  hotelRoomsHandler(type, price);
                }}
              >
                <strong>{constants.selectRooms}</strong>
              </Button>
            </div>
          </td>
        </tr>
      );
    }
  );
  return (
    <Container>
      <Row>
        <Table bordered>
          <thead>
            <tr>
              <th>{constants.roomType}</th>
              <th>{constants.roomOptions}</th>
              <th>{constants.roomInclusions}</th>
              <th>{constants.roomPrice}</th>
            </tr>
          </thead>

          <tbody>{hotelRooms}</tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default hotelRooms;
