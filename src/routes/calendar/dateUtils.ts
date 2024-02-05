export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const MONTHS = [
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
] as const;
export const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const getMonthName = (date: Date, short?: boolean) => {
  const month = date.getMonth();
  const monthNames = short ? SHORT_MONTHS : MONTHS;
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

export const formatTaskDialogDate = (date: Date) => {
  // Example: "Sun, 1st Jan"
  const day = date.getDate();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  const dayName = DAYS[date.getDay()];
  const monthName = getMonthName(date, true);

  return `${dayName}, ${day}${daySuffix} ${monthName}`;
};

export const formatDailyTaskTime = (date: Date) => {
  // Example: "12:00 PM"
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const compareWithToday = (date: Date) => {
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 0;
  }

  return date < today ? -1 : 1;
};
