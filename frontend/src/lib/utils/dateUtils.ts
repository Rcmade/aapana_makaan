import moment from "moment";

export function calculateRemainingTime(expireAt: Date | string) {
  // Convert expireAt to a Moment.js object
  const expireAtMoment = moment(expireAt);

  // Calculate the difference in milliseconds between expireAt and the current date
  const difference = expireAtMoment.diff(moment());

  // Convert the difference to days and hours
  const remainingDays = Math.floor(moment.duration(difference).asDays());
  const remainingHours = Math.floor(moment.duration(difference).asHours() % 24);

  // Return the remaining days and hours
  return { days: remainingDays, hours: remainingHours };
}

export function getTwoDaysAhead(dateString: Date): string {
  // Parse the date string using moment
  const date = moment(dateString);

  // Add two days to the date
  const twoDaysAhead = date.add(2, "days");

  // Format the date as per your requirement
  const formattedDate = twoDaysAhead.format("YYYY-MM-DD"); // Or any other format you prefer

  return formattedDate;
}

export function formatDateTime(date: Date): string {
  return moment(date).format("DD/MM/YYYY, HH:mm");
}

export const calculateOneYearFromNow = () => {
  const currentDate = new Date();
  const oneYearFromNow = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  return oneYearFromNow;
};
export const getRelativeTime = (dateString: string) => {
  return moment(dateString).fromNow(true); // The 'true' argument removes the "ago" suffix
};