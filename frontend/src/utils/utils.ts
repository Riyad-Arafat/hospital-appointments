// funvtion to convert a hoour to a timestamp
export const hourToTimestamp = (hour: number) => {
  let date = new Date();
  date.setHours(hour + 2, 0, 0, 0);
  return date.getTime() / 1000;
};

// function to convert a timestamp to a hour with pm or am
export const timestampToHour = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${minutesStr} ${ampm}`;
};

// get the same houre from the current date
export const getSameHour = (timestamp: number) => {
  const _date = new Date(timestamp);
  const hours = _date.getHours();
  return hourToTimestamp(hours);
};
