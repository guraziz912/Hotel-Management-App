/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import CustomCard from '../UI/CustomCard';
import { fetchHotels } from './hotel_Actions';
import ProductFilter from '../Filter/ProductFilter/ProductFilter';

import classes from './Hotels.module.css';
import constants from '../../utils/constants';
import schemaContants from '../../utils/schemaContants';

const hotels = (props) => {
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotels.hotelData);
  const filter = useSelector((state) => state.hotels.filter);

  useEffect(() => {
    dispatch(fetchHotels(props.match.params.searchedCity, filter));
  }, [props.match.params.searchedCity, filter, dispatch]);
  let hotel = null;
  console.log(filter);
  if (hotelList.length !== 0) {
    hotel = hotelList.map(
      ({
        hotelName,
        image,
        location,
        basePrice,
        starRating,
        hotelType,
        hotelAmenities,
      }) => {
        return (
          <CustomCard
            type={constants.customCardTypeHotelListing}
            image={image}
            name={hotelName}
            location={location}
            rating={starRating}
            hotelType={hotelType}
            price={basePrice}
            amenities={hotelAmenities}
          ></CustomCard>
        );
      }
    );
  } else {
    hotel = (
      <p>
        <strong>{constants.noHotelsFound}</strong>
      </p>
    );
  }

  return (
    <Container>
      <Row className={classes.listingContainer}>
        <Col
          md={{
            span: schemaContants.hotelListingColSpan,
            offset: schemaContants.hotelListingColOffset,
          }}
        >
          <Container>
            <Row>
              <Col sm={schemaContants.productFilterCol}>
                <ProductFilter />
              </Col>
              <Col sm={schemaContants.hotelListingCol}>{hotel}</Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default hotels;
