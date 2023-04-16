export const getActivePassengersCount = (passengers) => {
  if (!passengers) return 0;
  return passengers.filter((passenger) => !passenger.wasRemoved).length;
};

export const getButtonText = (
  isUserDriver,
  isUserPassenger,
  isUserRemovedFromTrip,
  hasTripFinished
) => {
  if (isUserDriver) {
    if (hasTripFinished) return "Įvertinti keleivius";
    return "Atšaukti kelionę";
  }
  if (isUserPassenger && !isUserRemovedFromTrip) {
    if (hasTripFinished) return "Įvertinti vairuotoją";
    return "Atšaukti rezervaciją";
  }
  return "Rezervuoti vietą";
};
