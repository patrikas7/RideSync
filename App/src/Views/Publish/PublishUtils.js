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
