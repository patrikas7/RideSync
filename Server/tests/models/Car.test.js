import mongoose from "mongoose";
import User from "../../models/User";
import Car from "../../models/Car";

jest.mock("../../models/User");

describe("Car Model Test", () => {
  const carData = {
    _id: new mongoose.Types.ObjectId(),
    manufacturer: "Toyota",
    model: "Camry",
    licensePlateNumber: "ABC1234",
    type: "Sedan",
    manufactureYear: 2022,
    ownwer: new mongoose.Types.ObjectId(),
  };

  it("create & save car successfully", async () => {
    jest
      .spyOn(Car.prototype, "save")
      .mockImplementation(() => Promise.resolve(carData));

    const validCar = new Car(carData);
    const spy = jest.spyOn(validCar, "save");
    const savedCar = await validCar.save();

    expect(savedCar._id).toBeDefined();
    expect(savedCar.manufacturer).toBe(carData.manufacturer);
    expect(savedCar.model).toBe(carData.model);
    expect(savedCar.licensePlateNumber).toBe(carData.licensePlateNumber);
    expect(savedCar.type).toBe(carData.type);
    expect(savedCar.manufactureYear).toBe(carData.manufactureYear);
    expect(savedCar.ownwer.toString()).toBe(carData.ownwer.toString());

    expect(spy).toHaveBeenCalled();
  }, 3000);

  it("should set & get fields correctly", () => {
    const car = new Car();
    car.manufacturer = "Honda";
    car.model = "Accord";
    car.licensePlateNumber = "XYZ7890";
    car.type = "Sedan";
    car.manufactureYear = 2021;
    car.ownwer = new mongoose.Types.ObjectId();

    expect(car.manufacturer).toBe("Honda");
    expect(car.model).toBe("Accord");
    expect(car.licensePlateNumber).toBe("XYZ7890");
    expect(car.type).toBe("Sedan");
    expect(car.manufactureYear).toBe(2021);
    expect(car.ownwer).toBeDefined();
  });
});
