import axios from 'axios';
import { notificationAction } from '../Notifications/notificationSlice';

import { hotelActions } from './hotelSlice';

export const fetchSearchedCityData = (searchedCity) => {
  return async (dispatch) => {
    const fetchSearchData = async () => {
      const response = await axios.post(
        'http://localhost:8000/location/searchedCity',
        {
          name: searchedCity,
          headers: { 'accept-language': 'eng' },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const { data } = response.data;
      return data;
    };

    try {
      const searchedCity = await fetchSearchData();

      dispatch(hotelActions.replaceSearchFilterData(searchedCity));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

export const fetchHotels = (city, filter) => {
  return async (dispatch) => {
    const fetchHotelsByCity = async () => {
      const response = await axios.post(
        'http://localhost:8000/hotels/hotelListing',
        {
          headers: {
            'accept-language': 'eng',
          },
          city,
          filter: filter,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const { data } = response.data;
      return data;
    };

    try {
      const hotelList = await fetchHotelsByCity();

      dispatch(hotelActions.addHotelData(hotelList));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

export const fetchCities = () => {
  return async (dispatch) => {
    const fetchAllCities = async () => {
      const response = await axios.post(
        'http://localhost:8000/location/cities',
        { headers: { 'accept-language': 'eng' } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const { data } = response.data;
      return data;
    };

    try {
      const citiesData = await fetchAllCities();

      console.log(citiesData);
      dispatch(hotelActions.setCities(citiesData));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

// Fetching Hotel Detail
export const fetchHotelDetail = (name) => {
  return async (dispatch) => {
    const fetchHotelByName = async () => {
      const response = await axios.post(
        'http://localhost:8000/hotels/hotelDetail',
        {
          headers: {
            'accept-language': 'eng',
          },
          hotelName: name,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const { data } = response.data;
      return data;
    };

    try {
      const hotel = await fetchHotelByName();
      dispatch(hotelActions.setSelectedHotel(hotel));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

// Fetching Hotel Detail
export const fetchAmenities = (name) => {
  return async (dispatch) => {
    const fetchAllAmenities = async () => {
      const response = await axios.post('http://localhost:8000/amenities', {
        headers: { 'accept-language': 'eng' },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const { data } = response.data;
      return data;
    };

    try {
      const amenities = await fetchAllAmenities();

      dispatch(hotelActions.setHotelAmenities(amenities));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};

// Fetching static Data
export const fetchStaticData = () => {
  return async (dispatch) => {
    const fetchAllStaticData = async () => {
      const response = await axios.post('http://localhost:8000/staticData', {
        headers: { 'accept-language': 'eng' },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const { data } = response.data;
      return data;
    };

    try {
      const staticData = await fetchAllStaticData();

      dispatch(hotelActions.setStaticData(staticData));
    } catch (error) {
      dispatch(notificationAction.setErrorNotificationStatus);
    }
  };
};
