const User = require('../models/users');

// Getting users by email
const getUserByEmail = async (email) => {
  try {
    const userFound = await User.findOne({ where: email });
    return userFound;
  } catch (error) {
    return null;
  }
};

// creating user
const createUser = async (userBody) => {
  const user = await User.create(userBody);
  return user;
};

// Updating User
const updateUserInfo = async (email, filter) => {
  const updatedUser = await User.update(filter, { where: { email } });
  return updatedUser;
};
module.exports = { getUserByEmail, createUser, updateUserInfo };
