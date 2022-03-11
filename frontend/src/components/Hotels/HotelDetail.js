import { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HotelReviews from './HotelReviews';
import Rooms from './HotelRooms';
import { fetchHotelDetail } from './hotel_Actions';

import classes from './HotelDetail.module.css';
import constants from '../../utils/constants';
import schemaContants from '../../utils/schemaContants';

const HotelDetail = (props) => {
  const dispatch = useDispatch();
  const selectedHotel = useSelector(
    (state) => state.hotels.masterData.selectedHotel
  );
  useEffect(() => {
    dispatch(fetchHotelDetail(props.match.params.hotelName));
  }, [props.match.params.hotelName, dispatch]);

  // Hotel Amenitites displaying
  const hotelAmenities = selectedHotel.hotelAmenities.map((item) => {
    return <li>{item.ameninity}</li>;
  });

  // Hotel Policies
  const hotelPolicies = selectedHotel.hotelPolicies.map((item) => {
    return (
      <li className={classes.hotelPolicies}>
        <CheckCircleIcon />
        &ensp;{item.policies}
      </li>
    );
  });

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <Row>
              <strong>{selectedHotel.hotelName}</strong>
            </Row>
          </Col>
          <Row>{selectedHotel.location}</Row>
          <Row>
            {constants.nearestLandmark} {selectedHotel.landmark}
          </Row>
        </Row>
        <Row>
          <Col
            xs={schemaContants.hotelDetailColXs}
            md={schemaContants.hotelDetailColMd}
          >
            <img
              alt={selectedHotel.hotelName}
              src={selectedHotel.image}
              className={classes.hotelImage}
            />
          </Col>
          <Col
            xs={schemaContants.popularAmenitiesColXs}
            md={schemaContants.popularAmenitiesColMd}
          >
            <div className={classes.popularAmenitiesHeader}>
              Amenities & Services
            </div>
            <div className={classes.popularAmenitiesContainer}>
              <ul className={classes.popularAmenities}>{hotelAmenities}</ul>
            </div>
          </Col>
          <Col
            xs={schemaContants.hotelDetailColXs}
            md={schemaContants.hotelDetailColMd}
            className={classes.pricingColumn}
          >
            <div className={classes.pricing}>
              {constants.basePrice}
              <strong>{selectedHotel.basePrice}</strong>
              <span>{constants.perNight}</span>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={classes.detailTabs}>
        <Tabs
          defaultActiveKey={constants.roomEventKey}
          transition={false}
          id={constants.tabsId}
        >
          <Tab eventKey={constants.roomEventKey} title={constants.roomEventKey}>
            <div className={classes.tabColumn}>
              <Rooms
                hotelName={selectedHotel.hotelName}
                rooms={selectedHotel.rooms}
              />
            </div>
          </Tab>
          <Tab
            eventKey={constants.amenitiesEventKey}
            title={constants.amenitiesEventKey}
          >
            <div>{constants.somePopularAmenities}</div>
            <ul className={classes.amenities}>{hotelAmenities}</ul>
          </Tab>
          <Tab
            eventKey={constants.hotelPoliciesEventKey}
            title={constants.hotelPoliciesTitle}
          >
            <ul>{hotelPolicies}</ul>
          </Tab>
          <Tab
            eventKey={constants.hotelReviewsEventKey}
            title={constants.hotelReviewsTitle}
          >
            <div className={classes.userReviewHeader}>
              {constants.userReviews}
            </div>
            <div className={classes.userReviewContainer}>
              <HotelReviews reviews={selectedHotel.hotelReviews} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </Fragment>
  );
};
export default HotelDetail;
