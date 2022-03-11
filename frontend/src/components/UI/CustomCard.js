import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import RoomIcon from '@material-ui/icons/Room';

import { fetchHotelDetail } from '../Hotels/hotel_Actions';

import classes from './CustomCard.module.css';
import constants from '../../utils/constants';

const CustomCard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  let card = null;

  const hotelDetailHandler = async (name) => {
    await dispatch(fetchHotelDetail(name));

    history.push(location.pathname + `/${name}`);
  };
  switch (props.type) {
    case constants.customCardTypeCityListing:
      card = (
        <Card
          style={{ width: constants.cardWidth }}
          className={props.className}
        >
          <Card.Img
            class={constants.imgRounded}
            variant={constants.cardVariant}
            src={props.image}
          />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
          </Card.Body>
        </Card>
      );

      break;
    case constants.customCardTypeHotelListing:
      const hotelAmenities = props.amenities.map((item) => {
        return <li>{item.ameninity}</li>;
      });
      card = (
        <Card className={classes.hotelListing}>
          <Container>
            <Row>
              <Col sm={4}>
                <Card.Img
                  className={classes.hotelImage}
                  variant={constants.cardVariant}
                  src={props.image}
                />
              </Col>
              <Col sm={8}>
                <Card.Body className={classes.cardBody}>
                  <div className={classes.hotelAbout}>
                    <Rating
                      name={constants.ratingType}
                      value={props.rating}
                      readOnly
                    />
                    <span className={classes.hotelType}>{props.hotelType}</span>
                  </div>
                  <Card.Title>{props.name}</Card.Title>
                  <div>
                    <span>
                      <RoomIcon />
                    </span>
                    <span>{props.location}</span>
                  </div>
                  <Container className={classes.cardLowerBox}>
                    <Row>
                      <Col sm={9}>
                        <ul className={classes.hotelAmenities}>
                          {hotelAmenities}
                        </ul>
                      </Col>
                      <Col sm={3}>
                        <div className={classes.hotelPricing}>
                          {constants.basePrice}
                          {props.price}
                          <span>{constants.perNight}</span>
                        </div>
                        <Button
                          variant={constants.selectRoomButtonVariant}
                          onClick={() => hotelDetailHandler(props.name)}
                        >
                          {constants.selectRooms}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      );

      break;
    case 'filter':
      card = <Card className={props.className}>{props.children}</Card>;

      break;

    default:
      break;
  }
  return <Fragment>{card}</Fragment>;
};
export default CustomCard;
