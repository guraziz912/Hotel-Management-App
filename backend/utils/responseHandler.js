/* eslint-disable max-len */
// Resopnse handler for GET request
exports.successAuthResponseWithData = (res, statusCode, message, data, token) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    token,
  });

exports.successResponse = (res, statusCode, message, token) =>
  res.status(statusCode).json({
    success: true,
    message,
    token,
  });

exports.successResponseData = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

exports.faliedAuthResponse = (res, statusCode, message) =>
  res.json({
    statusCode,
    success: false,
    message,
  });
