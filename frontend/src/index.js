import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

// connecting with stripe gateway
const stripePromise = loadStripe(
  'pk_test_51IyhiTSAoPHzmNjVBMWYDdC09jqqR0QKSRQXJTR5XncbGUsHd3EV8OoETxnF5VIDGW92FdIJOI2SneZ4wbQgmHYe00bhLttufU'
);

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </Elements>,
  document.getElementById('root')
);
