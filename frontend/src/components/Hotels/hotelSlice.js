import { createSlice } from '@reduxjs/toolkit';
import {
  checkIfPresent,
  checkIfRangeArrayIsPresent,
  rangeArrayFilter,
  itemFilter,
} from '../../utils/helperFunctions';

const initialHotelState = {
  hotelData: [],
  filter: {
    selectedAmenities: [],
    selectedStarRating: [],
    selectedHotelType: [],
    selectedPrice: [],
    freeBreakfast: null,
    freeCancelation: null,
  },
  filterData: [],
  searchFilterData: [],
  masterData: {
    cities: [],
    searchedCity: null,
    selectedHotel: null,
    prices: [
      { 'Upto ₹2000': [0, 2000] },
      { '₹2000-₹4000': [2000, 4000] },
      { '₹4000-₹6000': [4000, 6000] },
      { '₹6000+': [6000, 8000] },
    ],
    ratings: ['1', '2', '3', '4', '5'],
    hotelTypes: ['Hotel', 'Guest House', 'BNB'],
    hotelAmenities: [], // coming from backend
    staticPageData: [],
  },
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: initialHotelState,
  reducers: {
    replaceSearchFilterData(state, { payload }) {
      state.searchFilterData = payload;
    },
    addHotelData(state, { payload }) {
      state.hotelData = payload;
    },
    setSearchedCity(state, { payload }) {
      state.masterData.searchedCity = payload;
    },
    setCities(state, { payload }) {
      state.masterData.cities = payload;
    },
    setSelectedHotel(state, { payload }) {
      state.masterData.selectedHotel = payload;
    },
    // fetching and setting hotel amenities
    setHotelAmenities(state, { payload }) {
      state.masterData.hotelAmenities = payload;
    },
    // setting star ratings
    setStarRating(state, { payload }) {
      const { value, checked } = payload;
      if (checked && !checkIfPresent(state.filter.selectedStarRating, value)) {
        state.filter.selectedStarRating.push(value);
      } else if (
        !checked &&
        checkIfPresent(state.filter.selectedStarRating, value)
      ) {
        state.filter.selectedStarRating = itemFilter(
          state.filter.selectedStarRating,
          value
        );
      }
    },
    // setting free breakfast filter
    setFreeBreakfastFilter(state, { payload }) {
      const { value, checked } = payload;
      if (checked) {
        state.filter.freeBreakfast = value;
      } else {
        state.filter.freeBreakfast = null;
      }
    },
    // setting free cancellation filter
    setFreeCancelationFilter(state, { payload }) {
      const { value, checked } = payload;
      if (checked) {
        state.filter.freeCancelation = value;
      } else {
        state.filter.freeCancelation = null;
      }
    },
    // setting hotel type filter
    setHotelType(state, { payload }) {
      const { value, checked } = payload;
      if (checked && !checkIfPresent(state.filter.selectedHotelType, value)) {
        state.filter.selectedHotelType.push(value);
      } else if (
        !checked &&
        checkIfPresent(state.filter.selectedHotelType, value)
      ) {
        state.filter.selectedHotelType = itemFilter(
          state.filter.selectedHotelType,
          value
        );
      }
    },
    //setting price range filter
    setPrice(state, { payload }) {
      const { value, checked } = payload;
      if (
        checked &&
        !checkIfRangeArrayIsPresent(state.filter.selectedPrice, value)
      ) {
        state.filter.selectedPrice.push(value);
      } else if (
        checked === false &&
        checkIfRangeArrayIsPresent(state.filter.selectedPrice, value)
      ) {
        state.filter.selectedPrice = rangeArrayFilter(
          state.filter.selectedPrice,
          value
        );
      }
    },
    //setting amenities
    setFilterAmenities(state, { payload }) {
      const { value, checked } = payload;
      if (
        checked &&
        !checkIfRangeArrayIsPresent(state.filter.selectedAmenities, value)
      ) {
        state.filter.selectedAmenities.push(value);
      } else if (
        checked === false &&
        checkIfRangeArrayIsPresent(state.filter.selectedAmenities, value)
      ) {
        state.filter.selectedAmenities = rangeArrayFilter(
          state.filter.selectedAmenities,
          value
        );
      }
    },
    setStaticData(state, { payload }) {
      state.masterData.staticPageData = payload;
    },
  },
});

export const hotelReducer = hotelSlice.reducer;
export const hotelActions = hotelSlice.actions;
