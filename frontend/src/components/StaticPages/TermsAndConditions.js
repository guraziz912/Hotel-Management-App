import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { findItemByName } from '../../utils/helperFunctions';

import constants from '../../utils/constants';
import classes from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  const staticData = useSelector(
    (state) => state.hotels.masterData.staticPageData
  );

  const termsAndConditionData = findItemByName(
    staticData,
    constants.termsAndConditions
  );

  return (
    <Fragment>
      <Container className={classes.termsContainer}>
        <Row>
          <Col md={{ span: 7, offset: 2 }}>
            <div>
              <strong className={classes.termsHeader}>
                {constants.termsAndConditions}
              </strong>
            </div>
            <div className={classes.termsContent}>
              {termsAndConditionData.data}
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default TermsAndConditions;
