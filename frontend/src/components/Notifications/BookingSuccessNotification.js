import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import constants from '../../utils/constants';
const BookingSuccessNotification = () => {
  const bookingStatus = useSelector(
    (state) => state.booking.masterData.bookingStatus
  );
  return (
    <Alert show={bookingStatus} variant={constants.alertSuccess} dismissible>
      {constants.bookingSuccess}
    </Alert>
  );
};
export default BookingSuccessNotification;
