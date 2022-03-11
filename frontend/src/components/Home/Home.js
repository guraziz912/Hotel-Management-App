import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchFilter from '../Filter/SearchFilter/SearchFilter';
import CustomCard from '../UI/CustomCard';
import { fetchCities } from '../Hotels/hotel_Actions';

import classes from './Home.module.css';
import constants from '../../utils/constants';

const Home = (props) => {
  const dispatch = useDispatch();

  const citiesData = useSelector((state) => state.hotels.masterData.cities);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  const cities = citiesData.map(({ image, city }) => {
    return (
      <CustomCard
        type={constants.customCardTypeCityListing}
        image={image}
        name={city}
      ></CustomCard>
    );
  });

  return (
    <Fragment>
      <SearchFilter />

      <div className={classes.cityList}>
        <label>{constants.cititesLabel}</label>
        <div className={classes.cities}>{cities}</div>
      </div>
    </Fragment>
  );
};
export default Home;
