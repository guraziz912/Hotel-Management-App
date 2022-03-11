import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import Input from '../UI/Input';
import { signupValidate } from '../../validations/validation';
import { userActions } from './userSlice';
import { userSignUp } from './user_Actions';
import constants from '../../utils/constants';
import schemaContants from '../../utils/schemaContants';

const UserSignUp = () => {
  const dispatch = useDispatch();
  const userMasterData = useSelector((state) => state.user.masterData);
  const userData = useSelector((state) => state.user.userData);

  const { userSignUpModalShow, userSignUpFailStatus } = userMasterData;

  const signUpError = !userSignUpFailStatus.status && (
    <p>{userSignUpFailStatus.message}</p>
  );

  const handleClose = (event) => {
    dispatch(userActions.setSignUpModalShow());
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal show={userSignUpModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{constants.login}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              about: '',
              image: '',
            }}
            validationSchema={signupValidate}
            onSubmit={(values) => {
              let data = new FormData();
              data.append('name', values.name);
              data.append('email', values.email);
              data.append('password', values.password);
              data.append('confirmPassword', values.confirmPassword);
              data.append('about', values.about);
              data.append('image', values.image);
              dispatch(userSignUp(data));
              if (Object.keys(userData).length !== schemaContants.minLength) {
                dispatch(userActions.setSignUpModalShow());
              }
            }}
          >
            {(formik) => (
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
                    label={constants.userNameLabel}
                    name={constants.userName}
                    type={constants.inputTypeText}
                  />
                </div>
                <div>
                  <Input
                    label={constants.about}
                    name={constants.userAbout}
                    type={constants.inputTypeTextArea}
                  />
                </div>

                <div>
                  <Input
                    label={constants.userPasswordLabel}
                    name={constants.inputTypePassword}
                    type={constants.inputTypePassword}
                  />
                </div>
                <div>
                  <Input
                    label={constants.userConfirmPasswordLabel}
                    name={constants.userConfirmPasswordName}
                    type={constants.inputTypePassword}
                  />
                </div>
                <div>
                  <input
                    name={constants.userImage}
                    type={constants.inputTypeFile}
                    onChange={(e) => {
                      formik.setFieldValue('image', e.target.files[0]);
                    }}
                  />
                </div>
                <br></br>
                <div>
                  <Button
                    type={constants.buttonTypeSubmit}
                    variant={constants.paymentButtonColor}
                  >
                    {constants.submit}
                  </Button>
                </div>
                <div>{signUpError}</div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default UserSignUp;
