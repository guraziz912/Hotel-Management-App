//check if item already present in array
export const checkIfPresent = (data, item) => {
  if (data.includes(item)) {
    return true;
  } else {
    return false;
  }
};

//filtering array from the arrayof arrays
export const rangeArrayFilter = (data, item) => {
  const newData = data.filter((obj) => {
    if (obj[0] !== item[0] && obj[1] !== item[1]) {
      return true;
    } else {
      return false;
    }
  });
  return newData;
};

//checking if array present in array of arrays
export const checkIfRangeArrayIsPresent = (data, arr) => {
  for (const i of data) {
    if (i[0] === arr[0] && i[1] === arr[1]) {
      return true;
    }
  }
  return false;
};

// filter item from an array
export const itemFilter = (data, item) => {
  const newData = data.filter((obj) => obj !== item);
  return newData;
};

//Finding number of nights between two days

export const numberOfNights = (date1, date2) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  // The number of milliseconds in one day
  const milliSecondsInOneDay = 1000 * 60 * 60 * 24;

  // Convert back to days and return
  return Math.round(Math.abs(newDate1 - newDate2) / milliSecondsInOneDay);
};

// filter item from an array based on id
export const itemFilterById = (data, item) => {
  const newData = data.filter(({ id }) => id !== item);
  return newData;
};

// filter item from an array based on id
export const findItemByName = (data, item) => {
  const newData = data.find(({ name }) => name === item);
  return newData;
};
