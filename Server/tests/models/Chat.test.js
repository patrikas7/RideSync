import mongoose from "mongoose";
import User from "../../models/User";
import Chat from "../../models/Chat";

jest.mock("../../models/User");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Chat Model Test", () => {
  const chatData = {
    _id: new mongoose.Types.ObjectId(),
    users: [new mongoose.Types.ObjectId()],
    messages: [new mongoose.Types.ObjectId()],
  };

  it("create & save chat successfully", async () => {
    jest
      .spyOn(Chat.prototype, "save")
      .mockImplementation(() => Promise.resolve(chatData));

    const validChat = new Chat(chatData);
    const spy = jest.spyOn(validChat, "save");
    const savedChat = await validChat.save();

    expect(savedChat._id).toBeDefined();
    expect(Array.isArray(savedChat.users)).toBe(true);
    expect(savedChat.users[0].toString()).toBe(chatData.users[0].toString());
    expect(Array.isArray(savedChat.messages)).toBe(true);
    expect(savedChat.messages[0].toString()).toBe(
      chatData.messages[0].toString()
    );

    expect(spy).toHaveBeenCalled();
  });

  //   it("should add chat id to user chats on save", async () => {
  //     jest
  //       .spyOn(Chat.prototype, "save")
  //       .mockImplementation(() => Promise.resolve(chatData));

  //     const userId = new mongoose.Types.ObjectId();
  //     const userMock = {
  //       _id: userId,
  //       chats: [],
  //       save: jest.fn(),
  //     };

  //     User.findById = jest.fn().mockReturnValue(userMock);

  //     const chat = new Chat({ users: [userId], messages: [] });
  //     await chat.save();

  //     expect(userMock.chats[0]?.toString()).toBe(chat._id.toString());
  //     expect(userMock.save).toHaveBeenCalled();
  //   });
});
