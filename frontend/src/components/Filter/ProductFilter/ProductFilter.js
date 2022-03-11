import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../../utils/constants';
import { hotelActions } from '../../Hotels/hotelSlice';

import CheckBox from '../../UI/CheckBox';
import CustomCard from '../../UI/CustomCard';

import classes from './ProductFilter.module.css';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const [priceChecked, setPriceChecked] = useState({
    'Upto ₹2000': false,
    '₹2000-₹4000': false,
    '₹4000-₹6000': false,
    '₹6000+': false,
  });
  const priceRange = useSelector((state) => state.hotels.masterData.prices);
  const ratings = useSelector((state) => state.hotels.masterData.ratings);
  const hotelType = useSelector((state) => state.hotels.masterData.hotelTypes);
  const hotelAmenities = useSelector(
    (state) => state.hotels.masterData.hotelAmenities
  );

  //handlers

  // popular filter handler
  const freeCancelationHandler = (event) => {
    dispatch(
      hotelActions.setFreeCancelationFilter({
        value: event.target.value,
        checked: event.target.checked,
      })
    );
  };

  const freeBreakfastHandler = (event) => {
    dispatch(
      hotelActions.setFreeBreakfastFilter({
        value: event.target.value,
        checked: event.target.checked,
      })
    );
  };

  const priceHandler = (event) => {
    setPriceChecked({
      ...priceChecked,
      [event.target.name]: event.target.checked,
    });
    const priceRange = JSON.parse(event.target.value);
    dispatch(
      hotelActions.setPrice({
        value: priceRange,
        checked: event.target.checked,
      })
    );
  };

  // selecting hotel type
  const hotelTypeHandler = (event) => {
    dispatch(
      hotelActions.setHotelType({
        value: event.target.name,
        checked: event.target.checked,
      })
    );
  };

  // selecting ratings

  const ratingHandler = (event) => {
    dispatch(
      hotelActions.setStarRating({
        value: event.target.name,
        checked: event.target.checked,
      })
    );
  };

  // selecting amenities

  const amenityHandler = (event) => {
    dispatch(
      hotelActions.setFilterAmenities({
        value: event.target.name,
        checked: event.target.checked,
      })
    );
  };

  //mapping price range
  const hotelPriceRange = priceRange.map((item) => {
    return (
      <CheckBox
        type={constants.checkBoxTypeCheck}
        name={Object.keys(item)[0]} //accessing keys of the object as name
        checked={priceChecked[Object.keys(item)[0]]}
        value={JSON.stringify(item[Object.keys(item)[0]])}
        onChange={priceHandler}
      />
    );
  });

  //mapping ratings
  const hotelRatings = ratings.map((item) => {
    return (
      <CheckBox
        type={constants.checkBoxTypeRatings}
        name={item} //accessing keys of the object as name
        onChange={ratingHandler}
      />
    );
  });

  //mapping hotel types
  const hotelTypes = hotelType.map((item) => {
    return (
      <CheckBox
        type={constants.checkBoxTypeCheck}
        name={item}
        onChange={hotelTypeHandler}
      />
    );
  });
  //mapping hotel amenities
  const amenities = hotelAmenities.map(({ ameninity }) => {
    return (
      <CheckBox
        type={constants.checkBoxTypeCheck}
        name={ameninity}
        onChange={amenityHandler}
      />
    );
  });

  return (
    <CustomCard
      type={constants.customCardTypeFilter}
      className={classes.filterCard}
    >
      <div className={classes.filterHeader}>Filter</div>
      <div>
        <CheckBox
          type={constants.checkBoxTypeCheck}
          name={constants.freeCancellationName}
          value={constants.freeCancellationValue}
          onChange={freeCancelationHandler}
        />
      </div>
      <div>
        <CheckBox
          type={constants.checkBoxTypeCheck}
          name={constants.freeBreakfastName}
          value={constants.freeBreakFastValue}
          onChange={freeBreakfastHandler}
        />
      </div>
      <div>
        <div className={classes.typeHeaders}>{constants.hotelPrice}</div>
        <div className={classes.filterTypes}>{hotelPriceRange}</div>
      </div>
      <div>
        <div className={classes.typeHeaders}>{constants.hotelRatings}</div>
        <div className={classes.filterTypes}>{hotelRatings}</div>
      </div>
      <div>
        <div className={classes.typeHeaders}>{constants.hotelType}</div>
        <div className={classes.filterTypes}>{hotelTypes}</div>
      </div>
      <div>
        <div className={classes.typeHeaders}>{constants.hotelAmenities}</div>
        <div className={classes.filterTypes}>{amenities}</div>
      </div>
    </CustomCard>
  );
};
export default ProductFilter;
