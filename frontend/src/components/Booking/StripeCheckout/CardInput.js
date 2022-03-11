import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import constants from '../../../utils/constants';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: constants.cardElementBase,
      fontFamily: constants.cardElementFontFamily,
      fontSmoothing: constants.cardElementFontSmoothing,
      fontSize: constants.cardElementFontSize,
      '::placeholder': {
        color: constants.cardElementFontColor,
      },
    },
    invalid: {
      color: constants.cardElementInvalidFontColor,
      iconColor: constants.cardElementInvalidIconColor,
    },
  },
};

export default function CardInput() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}
