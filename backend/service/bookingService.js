const Bookings = require('../models/bookings');

// creating a booking
const addBooking = async ({
  id,
  hotelName,
  rooms,
  roomType,
  guestName,
  mobile,
  email,
  totalPrice,
  adults,
  children,
  checkIn,
  checkOut,
}) => {
  const addedBooking = await Bookings.create({
    id,
    hotelName,
    rooms,
    roomType,
    guestName,
    mobile,
    email,
    totalPrice,
    adults,
    children,
    checkIn,
    checkOut,
  });
  return addedBooking;
};

// deleting a booking
const deleteBooking = async (filter) => {
  const deletedBooking = await Bookings.destroy({
    where: filter,
  });
  return deletedBooking;
};

module.exports = { addBooking, deleteBooking };
