import { createSlice } from '@reduxjs/toolkit';
import constants from '../../utils/constants';

import { itemFilterById } from '../../utils/helperFunctions';
import schemaContants from '../../utils/schemaContants';

const initialBookingState = {
  bookingData: {
    guestName: null,
    mobile: null,
    email: null,
  },
  masterData: {
    bookingStatus: false,
    totalRooms: schemaContants.totalRoom,
    totalAdults: schemaContants.totalAduts,
    totalChildren: schemaContants.totalChildren,
    childrenData: [],
    checkIn: new Date().toISOString(),
    checkOut: null,
    totalPrice: null,
  },
};

const bookingSlice = createSlice({
  name: constants.booking,
  initialState: initialBookingState,
  reducers: {
    setAdults(state, { payload }) {
      switch (payload) {
        case constants.caseIncrease:
          if (state.masterData.totalAdults < schemaContants.maxAdults) {
            state.masterData.totalAdults++;
          }

          break;
        case constants.caseDecrease:
          if (state.masterData.totalAdults > schemaContants.minGuestsandRooms) {
            state.masterData.totalAdults--;
          }

          break;
        default:
          break;
      }
    },
    setRooms(state, { payload }) {
      switch (payload) {
        case constants.caseIncrease:
          if (state.masterData.totalRooms < schemaContants.maxRooms) {
            state.masterData.totalRooms++;
          }

          break;
        case constants.caseDecrease:
          if (state.masterData.totalRooms > schemaContants.minGuestsandRooms) {
            state.masterData.totalRooms--;
          }

          break;
        default:
          break;
      }
    },
    setCheckIn(state, { payload }) {
      state.masterData.checkIn = payload;
      state.bookingData = { ...state.bookingData, checkIn: payload };
    },
    setCheckOut(state, { payload }) {
      state.masterData.checkOut = payload;
      state.bookingData = { ...state.bookingData, checkOut: payload };
    },
    setHotelInfo(state, { payload }) {
      state.bookingData = {
        ...state.bookingData,
        ...payload,
      };
    },
    setGuestInfo(state, { payload }) {
      state.bookingData = { ...state.bookingData, ...payload };
    },
    setChildren(state, { payload }) {
      switch (payload) {
        case constants.caseIncrease:
          if (state.masterData.totalChildren < 5) {
            state.masterData.totalChildren++;
            state.masterData.childrenData.push({
              id: state.masterData.totalChildren,
              age: 0,
            });
          }

          break;
        case constants.caseDecrease:
          if (
            state.masterData.totalChildren > schemaContants.minGuestsandRooms
          ) {
            // filtering childrenData array based on id
            state.masterData.childrenData = itemFilterById(
              state.masterData.childrenData,
              state.masterData.totalChildren
            );
            state.masterData.totalChildren--;
          }

          break;
        default:
          break;
      }
    },
    setBookingStatus(state) {
      state.masterData.bookingStatus = !state.masterData.bookingStatus;
    },
  },
});
export const bookingReducer = bookingSlice.reducer;
export const bookingActions = bookingSlice.actions;
