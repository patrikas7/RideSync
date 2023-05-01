import {
  hasObjectEmptyValues,
  isObjectEmpty,
  getErrorState,
  getFormatedTodaysDate,
  isDateInPast,
  getFormatedDateTime,
  isTimeLaterOrEqual,
  count18YearsInThePast,
  generatePictureUri,
  calculateAge,
  printError,
  constructCarsList,
} from "../../src/Utils/utils";

describe("hasObjectEmptyValues", () => {
  it("returns true if any property of an object is empty", () => {
    const obj = { foo: "", bar: "hello", baz: 0 };
    expect(hasObjectEmptyValues(obj)).toBe(true);
  });

  it("returns false if all properties of an object are non-empty", () => {
    const obj = { foo: "world", bar: "hello", baz: 42 };
    expect(hasObjectEmptyValues(obj)).toBe(false);
  });
});

describe("isObjectEmpty", () => {
  it("returns true if an object has no properties", () => {
    const obj = {};
    expect(isObjectEmpty(obj)).toBe(true);
  });

  it("returns false if an object has one or more properties", () => {
    const obj = { foo: "world", bar: "hello", baz: 42 };
    expect(isObjectEmpty(obj)).toBe(false);
  });
});

describe("getErrorState", () => {
  it("returns an object with an error message for each empty field", () => {
    const fields = {
      username: "",
      password: "password123",
      email: "",
      age: 25,
    };
    const errorMessage = "This field is required";
    const expectedErrors = { username: errorMessage, email: errorMessage };
    expect(getErrorState(fields, errorMessage)).toEqual(expectedErrors);
  });

  it("returns an empty object if all fields are non-empty", () => {
    const fields = {
      username: "johndoe",
      password: "password123",
      email: "johndoe@example.com",
      age: 25,
    };
    const errorMessage = "This field is required";
    expect(getErrorState(fields, errorMessage)).toEqual({});
  });
});

describe("getFormatedTodaysDate", () => {
  it("should return the correct format of today's date", () => {
    const today = new Date();
    const expected = today.toISOString().split("T")[0];
    const result = getFormatedTodaysDate();
    expect(result).toBe(expected);
  });
});

describe("isDateInPast", () => {
  it("should return true if the given date is in the past", () => {
    const pastDate = new Date("2022-01-01");
    const result = isDateInPast(pastDate.toISOString());
    expect(result).toBe(true);
  });

  it("should return false if the given date is in the future", () => {
    const futureDate = new Date("2030-01-01");
    const result = isDateInPast(futureDate.toISOString());
    expect(result).toBe(false);
  });

  it("should return false if the given date is today", () => {
    const today = new Date();
    const result = isDateInPast(today.toISOString());
    expect(result).toBe(false);
  });
});

describe("getFormatedDateTime", () => {
  it("should return the correct formatted date time string", () => {
    const date = new Date("2022-05-01T15:00:00Z");
    const expected = "2022-05-01 15:00";
    const result = getFormatedDateTime(date);
    expect(result).toBe(expected);
  });
});

describe("count18YearsInThePast", () => {
  test("should return a string with the date 18 years ago", () => {
    const today = new Date();
    const expectedDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .slice(0, 10);
    expect(count18YearsInThePast()).toBe(expectedDate);
  });
});

describe("generatePictureUri", () => {
  test("should return undefined if profilePicture.buffer is falsy", () => {
    const profilePicture = { type: "image/jpeg", buffer: null };
    expect(generatePictureUri(profilePicture)).toBe(undefined);
  });
});

describe("calculateAge", () => {
  test("should return NaN if the input is not a valid date string", () => {
    const invalidDateString = "not-a-date-string";
    expect(calculateAge(invalidDateString)).toBe(NaN);
  });
});

describe("printError", () => {
  test("should log the error response data if available", () => {
    const error = {
      response: {
        data: { message: "error message" },
      },
    };
    console.error = jest.fn();
    printError(error);
    expect(console.error).toHaveBeenCalledWith(error.response.data);
  });

  test("should log the error object if response data is not available", () => {
    const error = new Error("something went wrong");
    console.error = jest.fn();
    printError(error);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});

// Test suite for constructCarsList function
describe("constructCarsList", () => {
  test("should return an array of objects with label and value properties", () => {
    const carsList = [
      {
        _id: "1",
        manufacturer: "Toyota",
        model: "Camry",
        licensePlateNumber: "ABC-123",
      },
      {
        _id: "2",
        manufacturer: "Honda",
        model: "Civic",
        licensePlateNumber: "XYZ-987",
      },
    ];
    const expectedList = [
      { label: "Toyota Camry ABC-123", value: "1" },
      { label: "Honda Civic XYZ-987", value: "2" },
    ];
    expect(constructCarsList(carsList)).toEqual(expectedList);
  });

  test("should return an empty array if input is an empty array", () => {
    const emptyList = [];
    expect(constructCarsList(emptyList)).toEqual([]);
  });
});
