/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { Container, Row, Col } from 'react-bootstrap';

import Counter from '../UI/Counter';
import SelectBox from '../UI/SelectBox';
import { bookingActions } from './bookingSlice';

import classes from './Guests.module.css';
import constants from '../../utils/constants';

const Guests = ({ onClose, anchorEl, open }) => {
  const dispatch = useDispatch();

  const { totalRooms, totalAdults, totalChildren } = useSelector(
    (state) => state.booking.masterData
  );
  // room increse and decrease handlers
  const increaseRoomHandler = () => {
    dispatch(bookingActions.setRooms(constants.caseIncrease));
  };

  const decreaseRoomHandler = () => {
    dispatch(bookingActions.setRooms(constants.caseDecrease));
  };
  // adults increse and decrease handlers
  const increaseAdultsHandler = () => {
    dispatch(bookingActions.setAdults(constants.caseIncrease));
  };
  const decreaseAdultHandler = () => {
    dispatch(bookingActions.setAdults(constants.caseDecrease));
  };

  // children handlers
  const increaseChildrenHandler = () => {
    dispatch(bookingActions.setChildren(constants.caseIncrease));
  };
  const decreaseChildrenHandler = () => {
    dispatch(bookingActions.setChildren(constants.caseDecrease));
  };

  return (
    <Popover
      id={Math.random()}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: constants.anchorVertical,
        horizontal: constants.anchorHorizontal,
      }}
      transformOrigin={{
        vertical: constants.transformOriginVertical,
        horizontal: constants.anchorHorizontal,
      }}
    >
      <Container fluid className={classes.popOverCard}>
        <Row>
          <Col>
            <div>{constants.rooms}</div>
            <div>
              <Counter
                quantity={totalRooms}
                onIncrease={increaseRoomHandler}
                onDecrease={decreaseRoomHandler}
              />
            </div>
          </Col>
          <Col>
            <div>{constants.adults}</div>
            <div>
              <Counter
                quantity={totalAdults}
                onIncrease={increaseAdultsHandler}
                onDecrease={decreaseAdultHandler}
              />
            </div>
          </Col>
          <Col>
            <div>{constants.children}</div>
            <div>
              <Counter
                quantity={totalChildren}
                onIncrease={increaseChildrenHandler}
                onDecrease={decreaseChildrenHandler}
              />
            </div>
          </Col>
          <div></div>
        </Row>
      </Container>
    </Popover>
  );
};

export default Guests;
