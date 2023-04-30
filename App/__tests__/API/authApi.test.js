import axios from "axios";
import {
  postRegistration,
  postSendPasswordReminder,
  postChangePassword,
} from "../../src/API/authApi";
import { printError } from "../../src/Utils/utils";

jest.mock("axios");
jest.mock("../../src/Utils/utils");

describe("authAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("postRegistration", () => {
    const body = { username: "testuser", password: "password" };
    const error = new Error("Registration failed");

    it("should call axios.post with the correct parameters and return undefined if successful", async () => {
      axios.post.mockResolvedValueOnce();

      const result = await postRegistration(body);

      expect(axios.post).toHaveBeenCalledWith("/auth/register", body);
      expect(result).toBeUndefined();
      expect(printError).not.toHaveBeenCalled();
    });

    it("should call printError and return an object with an error property if unsuccessful", async () => {
      axios.post.mockRejectedValueOnce(error);

      const result = await postRegistration(body);

      expect(axios.post).toHaveBeenCalledWith("/auth/register", body);
      expect(result).toEqual({ error });
      expect(printError).toHaveBeenCalledWith(error);
    });
  });

  describe("postSendPasswordReminder", () => {
    const email = "testuser@example.com";
    const error = new Error("Sending password reminder failed");

    it("should call axios.post with the correct parameters and return undefined if successful", async () => {
      axios.post.mockResolvedValueOnce();

      const result = await postSendPasswordReminder(email);

      expect(axios.post).toHaveBeenCalledWith("/auth/forgot-password", {
        email,
      });
      expect(result).toBeUndefined();
      expect(printError).not.toHaveBeenCalled();
    });
  });

  describe("postChangePassword", () => {
    const body = { oldPassword: "oldpassword", newPassword: "newpassword" };
    it("should call axios.post with the correct parameters and return undefined if successful", async () => {
      axios.post.mockResolvedValueOnce();

      const result = await postChangePassword(body);

      expect(axios.post).toHaveBeenCalledWith("/auth/change-password", body);
      expect(result).toBeUndefined();
      expect(printError).not.toHaveBeenCalled();
    });
  });
});
