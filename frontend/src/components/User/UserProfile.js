import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import classes from './UserProfile.module.css';
import constants from '../../utils/constants';
import schemaContants from '../../utils/schemaContants';

const UserProfile = (props) => {
  const userData = useSelector((state) => state.user.userData);
  const { name, image, about } = userData;

  return (
    <Fragment>
      <Container>
        <Row>
          <Col
            md={{
              span: schemaContants.userProfileColSpan,
              offset: schemaContants.userProfileColOffset,
            }}
          >
            <Container>
              <Row>
                <Col sm={schemaContants.userImageCol}>
                  <img
                    alt={name}
                    src={`http://localhost/assets/uploadedImages/${image}`}
                  />
                </Col>
                <Col sm={schemaContants.userDetailCol}>
                  <div className={classes.userProfileContainer}>
                    <strong className={classes.userName}>{name}</strong>
                  </div>
                  <div>{constants.about}</div>
                  <div>{about}</div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default UserProfile;
