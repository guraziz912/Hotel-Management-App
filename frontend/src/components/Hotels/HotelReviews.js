import { Fragment } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Container, Row, Col } from 'react-bootstrap';

import CustomCard from '../UI/CustomCard';

import classes from './HotelReviews.module.css';
import constants from '../../utils/constants';
import schemaContants from '../../utils/schemaContants';

const hotelReviews = ({ reviews }) => {
  const userReviews = reviews.map((item) => {
    return (
      <CustomCard type="filter" className={classes.reviewCard}>
        <Container>
          <Row>
            <Col sm={1}>
              <AccountCircleIcon fontSize={constants.accountIconSizeLarge} />
            </Col>
            <Col sm={schemaContants.hotelReviewColSm}>
              <div>
                <span className={classes.userName}>
                  <strong>{item.username}</strong>
                </span>
                <span
                  className={classes.userRatings}
                >{`${item.rating}/5`}</span>
              </div>
              <div className={classes.userReview}>{item.review}</div>
            </Col>
          </Row>
        </Container>
      </CustomCard>
    );
  });
  return (
    <Container>
      <Row>{userReviews}</Row>
    </Container>
  );
};

export default hotelReviews;
