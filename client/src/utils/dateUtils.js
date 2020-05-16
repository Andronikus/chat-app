export const getHHMMFromDate = (date) => {
  const time = [];
  time.push(date.getHours());
  time.push(date.getMinutes());

  return time.join(":");
};

export const getHHMMSSFromDate = (date) => {
  const time = [];
  time.push(date.getHours());
  time.push(date.getMinutes());
  time.push(date.getSeconds());

  return time.join(":");
};
