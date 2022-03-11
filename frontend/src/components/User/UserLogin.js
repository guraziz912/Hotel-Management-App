import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import Input from '../UI/Input';
import { loginValidate } from '../../validations/validation';
import { userActions } from './userSlice';
import UserSignUp from './UserSignUp';

import classes from './UserLogin.module.css';
import { userLogin } from './user_Actions';
import constants from '../../utils/constants';

const UserLogin = () => {
  const dispatch = useDispatch();
  const showLogin = useSelector(
    (state) => state.user.masterData.userLoginModalShow
  );

  // login modal close handler
  const handleClose = (event) => {
    dispatch(userActions.setModalShow());
  };
  //signup modal show handler
  const signupModalHanler = () => {
    dispatch(userActions.setModalShow());
    dispatch(userActions.setSignUpModalShow());
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{constants.login}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidate}
            onSubmit={(values) => {
              dispatch(userLogin(values.email, values.password));
              dispatch(userActions.setModalShow());
            }}
          >
            <Form>
              <div>
                <Input
                  label={constants.guestEmail}
                  name={constants.inputTypeEmail}
                  type={constants.inputTypeEmail}
                />
              </div>

              <div>
                <Input
                  label={constants.userPasswordLabel}
                  name={constants.inputTypePassword}
                  type={constants.inputTypePassword}
                />
              </div>
              <Button
                type={constants.buttonTypeSubmit}
                variant={constants.paymentButtonColor}
              >
                {constants.submit}
              </Button>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          {constants.notAUser}
          <span className={classes.userSignup} onClick={signupModalHanler}>
            {constants.signUp}
          </span>
        </Modal.Footer>
      </Modal>
      <UserSignUp />
    </div>
  );
};
export default UserLogin;
