export const generatePins = (departure, destination, stops) => [
  {
    latitude: departure.latitude,
    longitude: departure.longitude,
    draggable: false,
  },
  {
    latitude: destination.latitude,
    longitude: destination.longitude,
    draggable: false,
  },
  ...stops.map((stop) => ({
    latitude: stop.latitude,
    longitude: stop.longitude,
    draggable: false,
  })),
];

export const isAtLeastOneHourFromNow = (date, time) => {
  const now = new Date();
  const [hours, minutes] = time.split(":");
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
  const difference = target.getTime() - now.getTime();
  const oneHourInMilliseconds = 60 * 60 * 1000;

  return !isDateToday(date) || difference >= oneHourInMilliseconds;
};

export const isTimeGapSufficient = (
  departureDate,
  departureTime,
  returnDate,
  returnTime
) => {
  const departureDateTime = new Date(`${departureDate} ${departureTime}`);
  const returnDateTime = new Date(`${returnDate} ${returnTime}`);
  const timeDifferenceInMs = returnDateTime - departureDateTime;
  const timeDifferenceInMinutes = timeDifferenceInMs / (1000 * 60);

  return timeDifferenceInMinutes >= 30;
};

const isDateToday = (dateString) => {
  const date = new Date(dateString);

  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const parseSelectedDate = (selectedDate) => {
  const [date, time] = selectedDate.split(" ");
  return {
    date: date.replaceAll("/", "-"),
    time,
  };
};
