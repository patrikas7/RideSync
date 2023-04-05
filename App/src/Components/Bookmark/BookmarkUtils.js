import {
  DepartureTimeSlots,
  DepartureTimeSlotsKeys,
  AvailableSeatsSlotsKeys,
} from "../Filters/FiltersConstants";

export const getTimeFrameText = (departureTime) => {
  const matchingSlot = DepartureTimeSlots.find(
    (slot) => slot.key === departureTime
  );

  if (departureTime === DepartureTimeSlotsKeys.ALL_TIMES)
    return "Bet koks išvykimo laikas";
  else if (matchingSlot) return `Išvykimo langas: ${matchingSlot.value}`;
  else return "";
};

export const getSeatsCountText = (availableSeats) => {
  if (availableSeats === AvailableSeatsSlotsKeys.DOES_NOT_MATTER)
    return "Bet koks vietų skaičius";
  else if (matchingSlot) return matchingSlot.text;
  else return "";
};

export const getPriceText = (onlyFreeTrips, priceRange) => {
  if (onlyFreeTrips) return "Tik nemokamos kelionės";
  return `Nuo ${priceRange[0]}€ iki ${priceRange[1]}€`;
};
