import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../../../enums/enums.js";

import {
  buildSearchQuery,
  buildFiltersQuery,
  buildStopsSearchQuery,
  buildTripOptionsQuery,
  buildTimeQuery,
  buildPersonsCountQuery,
  buildPriceQuery,
  parseUserProfilePicture,
  findPassenger,
  getRatingAndReviewCount,
  parsePassengersProfilePictures,
} from "../../../controllers/Trip/TripControllerUtils.js";

const passengers = [
  { passenger: { _id: "123", name: "Alice" }, wasRemoved: false },
  { passenger: { _id: "456", name: "Bob" }, wasRemoved: true },
  { passenger: { _id: "789", name: "Charlie" }, wasRemoved: false },
];

const reviews = [
  { recipient: "123", rating: 3 },
  { recipient: "456", rating: 4 },
  { recipient: "789", rating: 5 },
];

describe("TripControllerUtils", () => {
  describe("buildSearchQuery", () => {
    it("should build search query correctly", () => {
      const req = {
        query: {
          destination: "New York",
          departure: "Los Angeles",
          date: "2022-01-01",
          personsCount: 2,
        },
      };
      const expectedQuery = {
        $and: [
          {
            $or: [
              {
                "departure.city": "Los Angeles",
                "destination.city": "New York",
              },
              {
                "departure.city": "Los Angeles",
                "stops.city": { $in: ["New York"] },
              },
              {
                "destination.city": "New York",
                "stops.city": { $in: ["Los Angeles"] },
              },
              {
                stops: {
                  $elemMatch: { city: "Los Angeles" },
                  $elemMatch: { city: "New York" },
                },
              },
            ],
          },
          { date: { $eq: "2022-01-01" } },
          { personsCount: 2 },
        ],
      };
      const query = buildSearchQuery(req);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildFiltersQuery", () => {
    it("should build filters query correctly", () => {
      const req = {
        destination: "New York",
        departure: "Los Angeles",
        tripOption: TripOptions.TRIP_WITHOUT_STOPS,
        departureTime: DepartureTimeSlots.SECOND_QUATER,
        availableSeats: AvailableSeatsSlots.TWO,
        onlyFreeTrips: "false",
        priceRange: ["10", "100"],
        date: "2022-01-01",
      };
      const expectedQuery = {
        $and: [
          {
            $or: [
              {
                "departure.city": "Los Angeles",
                "destination.city": "New York",
              },
              {
                "departure.city": "Los Angeles",
                "stops.city": { $in: ["New York"] },
              },
              {
                "destination.city": "New York",
                "stops.city": { $in: ["Los Angeles"] },
              },
              {
                stops: {
                  $elemMatch: { city: "Los Angeles" },
                  $elemMatch: { city: "New York" },
                },
              },
            ],
          },
          {
            stops: { $size: 0 },
          },
          {
            time: { $gte: "06:00", $lt: "11:59" },
          },
          {
            personsCount: { $gte: 2 },
          },
          {
            $expr: {
              $and: [
                { $ne: ["$price", ""] },
                {
                  $gte: [{ $convert: { input: "$price", to: "double" } }, 10],
                },
                {
                  $lte: [{ $convert: { input: "$price", to: "double" } }, 100],
                },
              ],
            },
          },
          { date: { $eq: "2022-01-01" } },
        ],
      };
      const query = buildFiltersQuery(req);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildStopsSearchQuery", () => {
    it("should build stops search query correctly for direct trip", () => {
      const destination = "New York";
      const departure = "Los Angeles";
      const expectedQuery = {
        $or: [
          {
            "departure.city": "Los Angeles",
            "destination.city": "New York",
          },
          {
            "departure.city": "Los Angeles",
            "stops.city": { $in: ["New York"] },
          },
          {
            "destination.city": "New York",
            "stops.city": { $in: ["Los Angeles"] },
          },
          {
            stops: {
              $elemMatch: { city: "Los Angeles" },
              $elemMatch: { city: "New York" },
            },
          },
        ],
      };
      const query = buildStopsSearchQuery(destination, departure);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildTripOptionsQuery", () => {
    it("should build trip options query correctly for all trips", () => {
      const tripOption = TripOptions.ALL_TRIPS;
      const expectedQuery = {};
      const query = buildTripOptionsQuery(tripOption);
      expect(query).toEqual(expectedQuery);
    });

    it("should build trip options query correctly for trip without stops", () => {
      const tripOption = TripOptions.TRIP_WITHOUT_STOPS;
      const expectedQuery = {
        stops: { $size: 0 },
      };
      const query = buildTripOptionsQuery(tripOption);
      expect(query).toEqual(expectedQuery);
    });

    it("should build trip options query correctly for trip with stops", () => {
      const tripOption = TripOptions.TRIP_WITH_STOPS;
      const expectedQuery = {
        stops: { $not: { $size: 0 } },
      };
      const query = buildTripOptionsQuery(tripOption);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildTimeQuery", () => {
    it("should build time query correctly for all times", () => {
      const departureTime = DepartureTimeSlots.ALL_TIMES;
      const expectedQuery = {};
      const query = buildTimeQuery(departureTime);
      expect(query).toEqual(expectedQuery);
    });

    it("should build time query correctly for first quarter", () => {
      const departureTime = DepartureTimeSlots.FIRST_QUATER;
      const expectedQuery = {
        time: { $gte: "00:00", $lt: "05:59" },
      };
      const query = buildTimeQuery(departureTime);
      expect(query).toEqual(expectedQuery);
    });

    it("should build time query correctly for second quarter", () => {
      const departureTime = DepartureTimeSlots.SECOND_QUATER;
      const expectedQuery = {
        time: { $gte: "06:00", $lt: "11:59" },
      };
      const query = buildTimeQuery(departureTime);
      expect(query).toEqual(expectedQuery);
    });

    it("should build time query correctly for third quarter", () => {
      const departureTime = DepartureTimeSlots.THIRD_QUATER;
      const expectedQuery = {
        time: { $gte: "12:00", $lt: "17:59" },
      };
      const query = buildTimeQuery(departureTime);
      expect(query).toEqual(expectedQuery);
    });

    it("should build time query correctly for fourth quarter", () => {
      const departureTime = DepartureTimeSlots.FOURTH_QUATER;
      const expectedQuery = {
        time: { $gte: "18:00", $lt: "23:59" },
      };
      const query = buildTimeQuery(departureTime);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildPersonsCountQuery", () => {
    it("should build persons count query correctly for does not matter", () => {
      const availableSeats = AvailableSeatsSlots.DOES_NOT_MATTER;
      const expectedQuery = {};
      const query = buildPersonsCountQuery(availableSeats);
      expect(query).toEqual(expectedQuery);
    });

    it("should build persons count query correctly for one available seat", () => {
      const availableSeats = AvailableSeatsSlots.ONE;
      const expectedQuery = {
        personsCount: { $gte: 1 },
      };
      const query = buildPersonsCountQuery(availableSeats);
      expect(query).toEqual(expectedQuery);
    });

    it("should build persons count query correctly for two available seats", () => {
      const availableSeats = AvailableSeatsSlots.TWO;
      const expectedQuery = {
        personsCount: { $gte: 2 },
      };
      const query = buildPersonsCountQuery(availableSeats);
      expect(query).toEqual(expectedQuery);
    });

    it("should build persons count query correctly for three available seats", () => {
      const availableSeats = AvailableSeatsSlots.THREE;
      const expectedQuery = {
        personsCount: { $gte: 3 },
      };
      const query = buildPersonsCountQuery(availableSeats);
      expect(query).toEqual(expectedQuery);
    });

    it("should build persons count query correctly for more than three available seats", () => {
      const availableSeats = AvailableSeatsSlots.MORE_THAN_THREE;
      const expectedQuery = {
        personsCount: { $gte: 4 },
      };
      const query = buildPersonsCountQuery(availableSeats);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("buildPriceQuery", () => {
    it("should build price query correctly for only free trips", () => {
      const onlyFreeTrips = "true";
      const priceRange = [null, null];
      const expectedQuery = {
        price: { $eq: "0" },
      };
      const query = buildPriceQuery(onlyFreeTrips, priceRange);
      expect(query).toEqual(expectedQuery);
    });

    it("should build price query correctly for price range", () => {
      const onlyFreeTrips = "false";
      const priceRange = ["10", "20"];
      const expectedQuery = {
        $expr: {
          $and: [
            { $ne: ["$price", ""] },
            { $gte: [{ $convert: { input: "$price", to: "double" } }, 10] },
            { $lte: [{ $convert: { input: "$price", to: "double" } }, 20] },
          ],
        },
      };
      const query = buildPriceQuery(onlyFreeTrips, priceRange);
      expect(query).toEqual(expectedQuery);
    });
  });

  describe("parseUserProfilePicture", () => {
    it("should parse profile picture buffer to base64 string", () => {
      const user = {
        profilePicture: { buffer: Buffer.from("test image") },
      };
      const expectedUser = {
        profilePicture: { buffer: "dGVzdCBpbWFnZQ==" },
      };
      const updatedUser = parseUserProfilePicture(user);
      expect(updatedUser).toEqual(expectedUser);
    });

    it("should not change user object if profile picture buffer not provided", () => {
      const user = {
        firstName: "John",
        lastName: "Doe",
      };
      const expectedUser = {
        firstName: "John",
        lastName: "Doe",
      };
      const updatedUser = parseUserProfilePicture(user);
      expect(updatedUser).toEqual(expectedUser);
    });
  });

  describe("buildSearchQuery", () => {
    test("returns a valid query when all query parameters are provided", () => {
      const req = {
        query: {
          destination: "New York",
          departure: "Boston",
          date: "2023-05-01",
          personsCount: "2",
        },
      };

      const expectedQuery = {
        $and: [
          {
            $or: [
              {
                "departure.city": "Boston",
                "destination.city": "New York",
              },
              {
                "departure.city": "Boston",
                "stops.city": { $in: ["New York"] },
              },
              {
                "destination.city": "New York",
                "stops.city": { $in: ["Boston"] },
              },
              {
                stops: {
                  $elemMatch: { city: "Boston" },
                  $elemMatch: { city: "New York" },
                },
              },
            ],
          },
          { date: { $eq: "2023-05-01" } },
          { personsCount: "2" },
        ],
      };

      const result = buildSearchQuery(req);

      expect(result).toEqual(expectedQuery);
    });
  });

  describe("findPassenger", () => {
    it("returns the correct passenger when the passenger is found", () => {
      const result = findPassenger(passengers, "123", false);
      expect(result).toEqual({
        passenger: { _id: "123", name: "Alice" },
        wasRemoved: false,
      });
    });

    it("returns undefined when the passenger is not found", () => {
      const result = findPassenger(passengers, "999", false);
      expect(result).toBeUndefined();
    });
  });

  describe("getRatingAndReviewCount", () => {
    it("returns the correct ratings and reviews count when reviews exist", () => {
      const result = getRatingAndReviewCount("123", reviews);
      expect(result).toEqual({ averageRating: 3, reviewsCount: 1 });
    });

    it("returns zero ratings and reviews count when no reviews exist", () => {
      const result = getRatingAndReviewCount("999", reviews);
      expect(result).toEqual({ averageRating: 0, reviewsCount: 0 });
    });
  });

  describe("parsePassengersProfilePictures", () => {
    it("should convert buffer to base64 string for each passenger profile picture", () => {
      const passengers = [
        {
          passenger: {
            _id: "123",
            profilePicture: { buffer: Buffer.from("test image buffer") },
          },
        },
        {
          passenger: {
            _id: "456",
            profilePicture: {
              buffer: Buffer.from("another test image buffer"),
            },
          },
        },
      ];
      const result = parsePassengersProfilePictures(passengers);
      expect(result[0].passenger.profilePicture.buffer).toBeDefined();
      expect(result[1].passenger.profilePicture.buffer).toBeDefined();
    });

    it("should not modify profile picture buffer if it is not present", () => {
      const passengers = [
        { passenger: { _id: "123" } },
        {
          passenger: {
            _id: "456",
            profilePicture: { buffer: Buffer.from("test image buffer") },
          },
        },
      ];
      const result = parsePassengersProfilePictures(passengers);
      expect(result[0].passenger?.profilePicture?.buffer).toBeUndefined();
      expect(result[1].passenger.profilePicture.buffer).toBeDefined();
    });
  });
});
