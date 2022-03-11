import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { findItemByName } from '../../utils/helperFunctions';

import constants from '../../utils/constants';
import classes from './AboutCompany.module.css';
import schemaContants from '../../utils/schemaContants';

const AboutCompany = () => {
  const staticData = useSelector(
    (state) => state.hotels.masterData.staticPageData
  );

  const aboutCompanyData = findItemByName(staticData, constants.about);

  return (
    <Fragment>
      <Container className={classes.aboutContainer}>
        <Row>
          <Col
            md={{
              span: schemaContants.AboutPageColSpan,
              offset: schemaContants.AboutPageColOffset,
            }}
          >
            <div>
              <strong className={classes.aboutHeader}>
                {constants.aboutHotelBook}
              </strong>
            </div>
            <div className={classes.aboutContent}>{aboutCompanyData.data}</div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default AboutCompany;
