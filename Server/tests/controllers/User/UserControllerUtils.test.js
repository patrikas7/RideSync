import { TripQueryTypes } from "../../../enums/enums.js";
import {
  getDateFilter,
  getTripSearchRequestPopulation,
  buildUserTripsResponse,
} from "../../../controllers/User/UserControllerUtils.js";

const driver = { _id: "1", name: "John" };
const passenger = { _id: "2", name: "Alice" };
const user = {
  _id: "3",
  name: "Bob",
  trips: [
    { _id: "t1", driver, passengers: [] },
    { _id: "t2", driver, passengers: [{ passenger }] },
    { _id: "t3", driver: { _id: "4", name: "Dave" }, passengers: [] },
  ],
  tripSearchRequests: [{ _id: "r1", user }],
};

describe("UserControllerUtils", () => {
  describe("getDateFilter", () => {
    it("should return filter for future trips", () => {
      const today = new Date();
      const futureType = TripQueryTypes.FUTURE;
      const expectedFilter = {
        date: { $gte: today.toISOString() },
      };
      const filter = getDateFilter(futureType);
      expect(filter).toEqual(expectedFilter);
    });

    it("should return filter for past trips", () => {
      const today = new Date();
      const pastType = TripQueryTypes.HISTORY;
      const expectedFilter = {
        date: { $lt: today.toISOString() },
      };
      const filter = getDateFilter(pastType);
      expect(filter).toEqual(expectedFilter);
    });

    it("should return empty filter for unknown type", () => {
      const unknownType = "unknown";
      const expectedFilter = {};
      const filter = getDateFilter(unknownType);
      expect(filter).toEqual(expectedFilter);
    });
  });

  describe("getTripSearchRequestPopulation", () => {
    it("should return expected population object for future trips", () => {
      const type = TripQueryTypes.FUTURE;
      const expectedPopulation = {
        path: "tripSearchRequests",
        populate: {
          path: "user",
          model: "BasicUser",
          select: "name profilePicture",
        },
      };
      const population = getTripSearchRequestPopulation(type);
      expect(population).toEqual(expectedPopulation);
    });

    it("should return empty string for other types", () => {
      const type = "invalidType";
      const expectedPopulation = "";
      const population = getTripSearchRequestPopulation(type);
      expect(population).toEqual(expectedPopulation);
    });
  });

  describe("buildUserTripsResponse", () => {
    it("should return all trips for history type", () => {
      const type = "HISTORY";
      const userId = "3";
      const expectedResponse = { trips: user.trips };
      const actualResponse = buildUserTripsResponse(type, user, userId);
      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
