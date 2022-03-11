import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import constants from '../../utils/constants';

const SuccessLoginNotifications = (props) => {
  const loginStatus = useSelector(
    (state) => state.user.masterData.userLoginAlertShow
  );

  return (
    <Alert show={loginStatus} variant={constants.alertSuccess} dismissible>
      {constants.userLoggedIn}
    </Alert>
  );
};
export default SuccessLoginNotifications;
