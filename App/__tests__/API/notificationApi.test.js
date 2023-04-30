import axios from "axios";
import {
  fetchNotificationData,
  fetchNotificationsData,
  fetchUnreadNotifications,
} from "../../src/API/notificationApi";

jest.mock("axios");
jest.mock("../../src/Utils/utils.js", () => ({
  printError: jest.fn(),
}));

describe("notifications API functions", () => {
  const token = "testToken";
  const id = "testId";

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchNotificationData", () => {
    it("fetches notification data successfully", async () => {
      const data = {
        notification: { id: "123", message: "Test notification" },
      };
      axios.get.mockResolvedValue({ data });

      const result = await fetchNotificationData(id, token);

      expect(axios.get).toHaveBeenCalledWith(`/notifications/${id}`, {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ notification: data.notification });
    });

    it("returns an error object when an error occurs", async () => {
      const error = new Error("Test error");
      axios.get.mockRejectedValue(error);

      const result = await fetchNotificationData(id, token);

      expect(axios.get).toHaveBeenCalledWith(`/notifications/${id}`, {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ error });
    });
  });

  describe("fetchNotificationsData", () => {
    it("fetches notifications data successfully", async () => {
      const data = [
        { id: "123", message: "Test notification 1" },
        { id: "456", message: "Test notification 2" },
      ];
      axios.get.mockResolvedValue({ data });

      const result = await fetchNotificationsData(token);

      expect(axios.get).toHaveBeenCalledWith("/notifications/user", {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ data });
    });

    it("returns an error object when an error occurs", async () => {
      const error = new Error("Test error");
      axios.get.mockRejectedValue(error);

      const result = await fetchNotificationsData(token);

      expect(axios.get).toHaveBeenCalledWith("/notifications/user", {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ error });
    });
  });

  describe("fetchUnreadNotifications", () => {
    it("fetches unread notifications count successfully", async () => {
      const data = { unreadNotificationsCount: 3 };
      axios.get.mockResolvedValue({ data });

      const result = await fetchUnreadNotifications(token);

      expect(axios.get).toHaveBeenCalledWith("/notifications/user/unread", {
        headers: { Authorization: token },
      });
      expect(result).toEqual({
        unreadNotificationsCount: data.unreadNotificationsCount,
      });
    });

    it("returns an error object when an error occurs", async () => {
      const error = new Error("Test error");
      axios.get.mockRejectedValue(error);

      const result = await fetchUnreadNotifications(token);

      expect(axios.get).toHaveBeenCalledWith("/notifications/user/unread", {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ error });
    });
  });
});
