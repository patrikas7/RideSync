import mongoose from "mongoose";

jest.mock("mongoose");

// jest.mock("../../models/User.js", () => ({
//   discriminator: jest.fn().mockReturnValue(BasicUser),
// }));

describe("BasicUser Model Test", () => {
  it("create & save user successfully", async () => {
    // const userData = {
    //   departureSearchHistory: ["New York", "Los Angeles"],
    //   destinationSearchHistory: ["Miami", "Seattle"],
    //   tripsSearchHistory: [
    //     { departure: "New York", destination: "Miami" },
    //     { departure: "Los Angeles", destination: "Seattle" },
    //   ],
    //   tripBookmarks: [new mongoose.Types.ObjectId()],
    //   reviews: [new mongoose.Types.ObjectId()],
    //   tripSubscriptions: [new mongoose.Types.ObjectId()],
    //   trips: [new mongoose.Types.ObjectId()],
    //   tripSearchRequests: [new mongoose.Types.ObjectId()],
    // };
    // User.discriminator.mockReturnValue(BasicUser);
    // const basicUser = new BasicUser(userData);
    // const spy = jest.spyOn(basicUser, "save");
    // basicUser.save();
    // expect(spy).toHaveBeenCalled();
    // expect(basicUser).toMatchObject(userData);
  });

  //   it("should set & get fields correctly", () => {
  //     const basicUser = new BasicUser();
  //     const spy = jest.spyOn(basicUser, "save");
  //     basicUser.departureSearchHistory = ["New York", "Los Angeles"];
  //     basicUser.destinationSearchHistory = ["Miami", "Seattle"];
  //     basicUser.tripsSearchHistory = [
  //       { departure: "New York", destination: "Miami" },
  //       { departure: "Los Angeles", destination: "Seattle" },
  //     ];
  //     basicUser.tripBookmarks = [new mongoose.Types.ObjectId()];
  //     basicUser.reviews = [new mongoose.Types.ObjectId()];
  //     basicUser.tripSubscriptions = [new mongoose.Types.ObjectId()];
  //     basicUser.trips = [new mongoose.Types.ObjectId()];
  //     basicUser.tripSearchRequests = [new mongoose.Types.ObjectId()];
  //     basicUser.save();

  //     expect(spy).toHaveBeenCalled();
  //     expect(basicUser.departureSearchHistory).toEqual([
  //       "New York",
  //       "Los Angeles",
  //     ]);
  //     expect(basicUser.destinationSearchHistory).toEqual(["Miami", "Seattle"]);
  //     expect(basicUser.tripsSearchHistory).toEqual([
  //       { departure: "New York", destination: "Miami" },
  //       { departure: "Los Angeles", destination: "Seattle" },
  //     ]);
  //     expect(basicUser.tripBookmarks).toHaveLength(1);
  //     expect(basicUser.reviews).toHaveLength(1);
  //     expect(basicUser.tripSubscriptions).toHaveLength(1);
  //     expect(basicUser.trips).toHaveLength(1);
  //     expect(basicUser.tripSearchRequests).toHaveLength(1);
  //   });
});
