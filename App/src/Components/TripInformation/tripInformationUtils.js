export const getActivePassengersCount = (passengers) => {
  if (!passengers) return 0;
  return passengers.filter((passenger) => !passenger.wasRemoved).length;
};

export const Actions = {
  RATE_PASSENGERS: "Įvertinti keleivius",
  RATE_DRIVER: "Įvertinti vairuotoją",
  CANCEL_TRIP: "Įvertinti keleivius",
  CANCEL_RESERVATION: "Atšaukti rezervaciją",
  RESERVE_SEAT: "Rezervuoti vietą",
};

export const getPossibleAction = (
  isUserDriver,
  isUserPassenger,
  isUserRemovedFromTrip,
  hasTripFinished
) => {
  if (isUserDriver) {
    if (hasTripFinished) return Actions.RATE_PASSENGERS;
    return Actions.CANCEL_TRIP;
  }
  if (isUserPassenger && !isUserRemovedFromTrip) {
    if (hasTripFinished) return Actions.RATE_DRIVER;
    return Actions.CANCEL_RESERVATION;
  }
  return Actions.RESERVE_SEAT;
};
