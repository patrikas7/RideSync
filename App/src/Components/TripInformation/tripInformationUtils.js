export const getActivePassengersCount = (passengers) => {
  if (!passengers) return 0;
  return passengers.filter((passenger) => !passenger.wasRemoved).length;
};

export const getButtonText = (
  isUserDriver,
  isUserPassenger,
  isUserRemovedFromTrip
) => {
  if (isUserDriver) return "Atšaukti kelionę";
  if (isUserPassenger && !isUserRemovedFromTrip) return "Atšaukti rezervaciją";
  return "Rezervuoti vietą";
};
