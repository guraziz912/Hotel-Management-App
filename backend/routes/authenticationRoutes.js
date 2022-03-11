const express = require('express');

const uploadImage = require('../utils/imageUploader');
const userController = require('../controller/user');
const Validator = require('../validations/userValidation');

const signUpValidation = Validator.signUpValidations;

const tokenValidator = require('../middlewares/tokenAuth');

const userRouter = express.Router();

// signup route
userRouter.post(
  '/signup',
  uploadImage.single('image'),
  signUpValidation(),
  Validator.checkValidationResult,
  userController.signup
);

// login route
userRouter.post(
  '/login',
  Validator.logInValidations(),
  Validator.checkValidationResult,
  userController.login
);

// logout route
userRouter.post('/logout', tokenValidator, userController.logout);

// Edit user route
userRouter.put('/editUser', userController.editUser);
module.exports = userRouter;
