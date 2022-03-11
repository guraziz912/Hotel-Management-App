import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Card, CardContent, TextField } from '@material-ui/core';

// stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
// Custom Components
import CardInput from './CardInput';
import { addBooking, stripePayment } from '../booking_Actions';

//contants
import schemaContants from '../../../utils/schemaContants';
import constants from '../../../utils/constants';
import { bookingActions } from '../bookingSlice';

const useStyles = makeStyles({
  root: {
    maxWidth: schemaContants.checkOutFormMaxWidth,
    margin: constants.checkOutFormMargin,
  },
  content: {
    display: constants.checkOutFormDisplay,
    flexDirection: constants.checkOutFormFlexDirection,
    alignContent: constants.checkOutFormAlignContent,
  },
  div: {
    display: constants.checkOutFormDisplay,
    flexDirection: constants.checkOutFormDivFlexDirection,
    alignContent: constants.checkOutFormDivAlignContent,
    justifyContent: constants.checkOutFormDivJustifyContent,
  },
  button: {
    margin: constants.checkOutFormButton,
  },
});

const CheckOutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');

  // State
  const bookingData = useSelector((state) => state.booking.bookingData);

  const stripe = useStripe();
  const elements = useElements();

  const emailHanler = (event) => {
    setEmail(event.target.value);
  };

  //payment handler
  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const clientSecret = await dispatch(
      stripePayment(email, bookingData.totalPrice)
    );
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const addedBooking = await dispatch(addBooking(bookingData));

        if (addedBooking.success) {
          history.push('/');
          dispatch(bookingActions.setBookingStatus());
        }
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label={constants.checkOutFormLabel}
          id={constants.checkOutFormId}
          helperText={constants.checkOutFormHelperText}
          margin={constants.checkOutFormEmailMargin}
          variant={constants.checkOutFormVariant}
          type={constants.emailType}
          required
          value={email}
          onChange={emailHanler}
          fullWidth
        />
        <CardInput />
        <div className={classes.div}>
          <Button
            variant={constants.paymentButtonVariant}
            color={constants.paymentButtonColor}
            className={classes.button}
            onClick={handleSubmit}
          >
            {constants.pay}
          </Button>
          <Button
            variant={constants.paymentButtonVariant}
            color={constants.paymentButtonColor}
            className={classes.button}
          >
            {constants.subscription}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckOutForm;
