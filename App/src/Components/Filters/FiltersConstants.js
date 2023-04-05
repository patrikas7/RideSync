export const TripOptions = {
  TRIP_WITH_STOPS: "Kelionės su sustojimas",
  TRIP_WITHOUT_STOPS: "Kelionės be sustojimų",
  ALL_TRIPS: "Visos kelionės",
};

export const DepartureTimeSlotsKeys = {
  ALL_TIMES: "ALL_TIMES",
  FIRST_QUATER: "FIRST_QUATER",
  SECOND_QUATER: "SECOND_QUATER",
  THIRD_QUATER: "THIRD_QUATER",
  FOURTH_QUATER: "FOURTH_QUATER",
};

export const DepartureTimeSlots = [
  { key: DepartureTimeSlotsKeys.ALL_TIMES, value: "Nesvarbu" },
  { key: DepartureTimeSlotsKeys.FIRST_QUATER, value: "00:00-06:00" },
  { key: DepartureTimeSlotsKeys.SECOND_QUATER, value: "06:00-12:00" },
  { key: DepartureTimeSlotsKeys.THIRD_QUATER, value: "12:00-18:00" },
  { key: DepartureTimeSlotsKeys.FOURTH_QUATER, value: "18:00-23:59" },
];

export const AvailableSeatsSlotsKeys = {
  DOES_NOT_MATTER: "DOES_NOT_MATTER",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
};

export const AvailableSeatsSlots = [
  { key: AvailableSeatsSlotsKeys.DOES_NOT_MATTER, value: "Nesvarbu" },
  { key: AvailableSeatsSlotsKeys.ONE, value: "1 vieta" },
  { key: AvailableSeatsSlotsKeys.TWO, value: "2 vietos" },
  { key: AvailableSeatsSlotsKeys.THREE, value: "3 vietos" },
  { key: AvailableSeatsSlotsKeys.FOUR, value: "4 vietos" },
];
