export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const getMonthName = (date: Date) => {
  const month = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month];
};

export const getMonthStartDate = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthStartDate = new Date(year, month, 1);
  return monthStartDate;
};

export const getMonthEndDate = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthEndDate = new Date(year, month + 1, 0);
  return monthEndDate;
};

export const getMonthStartPadding = (date: Date) => {
  const monthStartDate = getMonthStartDate(date);
  const weekDay = monthStartDate.getDay();

  const padding = [];
  for (let i = weekDay; i > 0; i--) {
    monthStartDate.setDate(monthStartDate.getDate() - 1);
    padding.push(new Date(monthStartDate));
  }

  return padding.reverse();
};

export const getMonthEndPadding = (date: Date) => {
  const monthEndDate = getMonthEndDate(date);
  const weekDay = monthEndDate.getDay();

  const padding = [];
  for (let i = weekDay; i < 6; i++) {
    monthEndDate.setDate(monthEndDate.getDate() + 1);
    padding.push(new Date(monthEndDate));
  }

  return padding;
};
