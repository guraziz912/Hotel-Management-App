import { Fragment } from 'react';

import { FormControlLabel, Checkbox } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import constants from '../../utils/constants';

const CheckBox = ({ checked, onChange, name, type, value, min, max }) => {
  let checkbox = null;
  switch (type) {
    case constants.checkBoxTypeRatings:
      checkbox = (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={onChange}
                name={name}
                color={constants.checkBoxColor}
              />
            }
            label={<Rating name={constants.ratingType} value={name} readOnly />}
          />
        </div>
      );
      break;
    case constants.checkBoxTypeCheck:
      checkbox = (
        <FormControlLabel
          control={
            <Checkbox
              value={value}
              checked={checked}
              onChange={onChange}
              name={name}
              color={constants.checkBoxColor}
            />
          }
          label={name}
        />
      );
      break;

    default:
      break;
  }
  return <Fragment>{checkbox}</Fragment>;
};
export default CheckBox;
