import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';

import CustomCard from '../UI/CustomCard';
import Input from '../UI/Input';
import { bookingActions } from '../Booking/bookingSlice';
import { guestInfoValidate } from '../../validations/validation';

import classes from './GuestInfo.module.css';
import constants from '../../utils/constants';

const GuestInfo = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <CustomCard
      type={constants.customCardTypeFilter}
      className={classes.guestInfoCard}
    >
      <Formik
        initialValues={{
          guestName: '',
          mobile: '',
          email: '',
        }}
        validationSchema={guestInfoValidate}
        onSubmit={(values) => {
          dispatch(bookingActions.setGuestInfo(values));
          history.push('/checkout');
        }}
      >
        <Form>
          <div>
            <Input
              label={constants.guestEmail}
              name={constants.inputTypeEmail}
              type={constants.inputTypeEmail}
            />
          </div>

          <div>
            <Input
              label={constants.guestNameLabel}
              name={constants.guestName}
              type={constants.inputTypeText}
            />
          </div>

          <div>
            <Input
              label={constants.mobile}
              name={constants.guestMobile}
              type={constants.inputTypeNumber}
            />
          </div>
          <br></br>
          <div>
            <Button
              type={constants.buttonTypeSubmit}
              variant={constants.paymentButtonColor}
            >
              {constants.proceedToPayment}
            </Button>
          </div>
        </Form>
      </Formik>
    </CustomCard>
  );
};

export default GuestInfo;
