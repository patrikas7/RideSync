import axios from "axios";
import { deleteTrip, deleteBooking } from "../../src/API/tripApi";

jest.mock("axios");
jest.mock("../../src/Utils/utils.js", () => ({
  printError: jest.fn(),
}));

describe("tripFunctions", () => {
  describe("deleteTrip", () => {
    it("should call axios.delete with the correct parameters", async () => {
      const mockToken = "mockToken";
      const mockId = "mockId";

      await deleteTrip(mockToken, mockId);

      expect(axios.delete).toHaveBeenCalledWith("/trips/information", {
        params: { id: mockId },
        headers: { Authorization: mockToken },
      });
    });

    it("should return an object with an error property if there's an error", async () => {
      const mockToken = "mockToken";
      const mockId = "mockId";
      const mockError = new Error("mockError");

      axios.delete.mockRejectedValue(mockError);

      const result = await deleteTrip(mockToken, mockId);

      expect(result).toEqual({ error: mockError });
    });
  });

  describe("deleteBooking", () => {
    it("should call axios.delete with the correct parameters", async () => {
      const mockId = "mockId";
      const mockPassengerId = "mockPassengerId";
      const mockToken = "mockToken";
      const mockData = { trip: "mockTrip" };

      axios.delete.mockResolvedValue({ data: mockData });

      const result = await deleteBooking(mockId, mockPassengerId, mockToken);

      expect(axios.delete).toHaveBeenCalledWith("/trips/bookings", {
        params: { id: mockId, passengerId: mockPassengerId },
        headers: { Authorization: mockToken },
      });
      expect(result).toEqual({ trip: mockData.trip });
    });

    it("should return an object with an error property if there's an error", async () => {
      const mockId = "mockId";
      const mockPassengerId = "mockPassengerId";
      const mockToken = "mockToken";
      const mockError = new Error("mockError");

      axios.delete.mockRejectedValue(mockError);

      const result = await deleteBooking(mockId, mockPassengerId, mockToken);

      expect(result).toEqual({ error: mockError });
    });
  });
});
