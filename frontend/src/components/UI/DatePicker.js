import { Fragment } from 'react';
import constants from '../../utils/constants';

import './DatePicker.css';

const DatePicker = ({ name, value, onChange, minDate, className }) => {
  return (
    <Fragment>
      <input
        className={className}
        type={constants.inputTypeDate}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={minDate}
      />
    </Fragment>
  );
};

export default DatePicker;
