export const TripOptionsValues = {
  TRIP_WITH_STOPS: "TRIP_WITH_STOPS",
  TRIP_WITHOUT_STOPS: "TRIP_WITHOUT_STOPS",
  ALL_TRIPS: "ALL_TRIPS",
};

export const TripOptionsLabels = [
  "Kelionės su sustojimas",
  "Kelionės be sustojimų",
  "Visos kelionės",
];

export const DepartureTimeSlots = [
  { key: "ALL_TIMES", value: "Nesvarbu" },
  { key: "FIRST_QUATER", value: "00:00-06:00" },
  { key: "SECOND_QUATER", value: "06:00-12:00" },
  { key: "THIRD_QUATER", value: "12:00-18:00" },
  { key: "FOURTH_QUATER", value: "18:00-23:59" },
];

export const AvailableSeatsSlots = [
  { key: "DOES_NOT_MATTER", value: "Nesvarbu" },
  { key: "1", value: "1 vieta" },
  { key: "2", value: "2 vietos" },
  { key: "3", value: "3 vietos" },
  { key: "4", value: "4 vietos" },
];
