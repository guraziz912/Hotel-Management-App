/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const checkUser = require('../service/userService');
// response handler
const responseHandler = require('../utils/responseHandler');
// Success messages
const authSuccessMessages = require('../messages/success/index');
// Failure messages
const authFailureMessages = require('../messages/error/index');
const CustomError = require('../middlewares/error');

const customError = new CustomError();
// token generation
const authToken = require('../utils/generateToken');
// sending email
const SendEmail = require('../utils/Email');

// Constants
const schemaConstants = require('../utils/schemaConstants');
const constants = require('../utils/constants');

// signup controller
exports.signup = async (req, res, next) => {
  const { id, name, email, about } = req.body;
  const uploadedImage = req.file;
  const lang = schemaConstants.engLanguage;
  try {
    const userData = await checkUser.getUserByEmail(email);
    if (userData) {
      return responseHandler.faliedAuthResponse(
        res,
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].userExist
      );
    }
    // hashing password
    bcrypt.hash(req.body.password, constants.hashSalt, async (err, hash) => {
      if (err || req.body.password !== req.body.confirmPassword) {
        return customError.apiError(
          constants.unauthorizeStatusCode,
          authFailureMessages[lang].encryptionFailed
        );
      }

      const createdUser = await Users.create({
        id,
        name,
        email,
        password: hash,
        image: uploadedImage.path,
        about,
      });
      if (createdUser) {
        const sentEmail = new SendEmail(email, name);
        const checkEmailSent = await sentEmail.sendMailWithAttachment;
        if (checkEmailSent) {
          const token = authToken.generateToken(
            createdUser.email,
            createdUser.id.toString()
          );
          return responseHandler.successAuthResponseWithData(
            res,
            constants.successStatusCode,
            authSuccessMessages[lang].userCreated,
            createdUser,
            token
          );
        }
        return customError.apiError(
          constants.unauthorizeStatusCode,
          authFailureMessages[lang].encryptionFailed
        );
      }
      return customError.apiError(
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].userSigninFailed
      );
    });
  } catch (error) {
    next(error);
  }
};

// login controller
exports.login = async (req, res) => {
  const lang = 'eng';

  const userData = await checkUser.getUserByEmail(req.body.email);

  if (!userData) {
    return responseHandler.faliedAuthResponse(
      res,
      constants.genericErrorStatusCode,
      authFailureMessages[lang].loginFailed
    );
  }

  // password matching
  const ifMatch = await bcrypt.compare(req.body.password, userData.password);

  if (ifMatch === false) {
    return responseHandler.faliedAuthResponse(
      res,
      constants.unauthorizeStatusCode,
      authFailureMessages[lang].incorrectPassword
    );
  }

  const token = authToken.generateToken(userData.email, userData.id.toString());

  return responseHandler.successAuthResponseWithData(
    res,
    constants.successStatusCode,
    authSuccessMessages[lang].loginSuccess,
    userData,
    token
  );
};

// logout
exports.logout = async (req, res) => {
  const lang = 'eng';
  const authHeader = req.body.headers['Authorization'];
  if (!authHeader) {
    return responseHandler.faliedAuthResponse(
      constants.genericErrorStatusCode,
      authFailureMessages[lang].loginFailed
    );
  }
  res.setHeader('Authorization', null);
  return responseHandler.successResponse(
    res,
    constants.successStatusCode,
    authSuccessMessages[lang].logoutSuccess
  );
};

// Edit User Profile
exports.editUser = async (req, res, next) => {
  const { lang } = req.headers['accept-language'];
  const { email, name, about } = req.body;
  const filter = { name, about };
  try {
    const existingUser = await checkUser.getUserByEmail(email);
    if (!existingUser) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].userNotFound
      );
    }
    const updatedUser = await checkUser.updateUserInfo(email, filter);
    if (updatedUser) {
      return responseHandler.successResponse(
        res,
        constants.successStatusCode,
        authSuccessMessages[lang].userUpdated
      );
    }
  } catch (error) {
    next(error);
  }
};
