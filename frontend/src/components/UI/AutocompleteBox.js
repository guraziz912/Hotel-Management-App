/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import constants from '../../utils/constants';

const autocomplete = ({ city, location, onSelect, onChange }) => {
  return (
    <Fragment>
      <Autocomplete
        id={constants.autoCompleteId}
        options={location}
        getOptionLabel={(option) => option.city}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={constants.autoCompleteLabel}
            onSelect={onSelect}
            onChange={onChange}
          />
        )}
      />
    </Fragment>
  );
};
export default autocomplete;
