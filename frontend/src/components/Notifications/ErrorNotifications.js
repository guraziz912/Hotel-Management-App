import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import constants from '../../utils/constants';
const ErrorNotifications = () => {
  const errorAlertShow = useSelector(
    (state) => state.notification.errorNotificationStatus
  );
  return (
    <Alert show={errorAlertShow} variant={constants.alertFailure} dismissible>
      {constants.error}
    </Alert>
  );
};
export default ErrorNotifications;
