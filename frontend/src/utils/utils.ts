// funvtion to convert a hoour to a timestamp
export const hourToTimestamp = (hour: number) => {
  let date = new Date();
  date.setHours(hour);
  return date.getTime();
};

// function to convert a timestamp to a hour with pm or am
export const timestampToHour = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  return addAmPm(hours);
};

// function to add pm or am a hour
export const addAmPm = (hour: number) => {
  const ampm = hour >= 12 ? "pm" : "am";
  const hours12 = hour % 12 || 12;
  return `${hours12} ${ampm}`;
};

// get the same houre from the current date
export const getSameHour = (timestamp: number) => {
  const _date = new Date(timestamp);
  const hours = _date.getHours();
  return hourToTimestamp(hours);
};
