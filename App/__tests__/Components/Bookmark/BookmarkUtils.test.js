import {
  DepartureTimeSlots,
  DepartureTimeSlotsKeys,
  AvailableSeatsSlotsKeys,
  AvailableSeatsSlots,
} from "../../../src/Components/Filters/FiltersConstants.js";

import {
  getTimeFrameText,
  getSeatsCountText,
  getPriceText,
} from "../../../src/Components/Bookmark/BookmarkUtils.js";

describe("Filter text generation", () => {
  it("should return correct time frame text", () => {
    expect(getTimeFrameText(DepartureTimeSlotsKeys.ALL_TIMES)).toBe(
      "Bet koks išvykimo laikas"
    );

    const matchingSlot = DepartureTimeSlots[0];
    expect(getTimeFrameText(matchingSlot.key)).toBe("Bet koks išvykimo laikas");

    expect(getTimeFrameText("non-existent-key")).toBe("");
  });

  it("should return correct seats count text", () => {
    expect(getSeatsCountText(AvailableSeatsSlotsKeys.DOES_NOT_MATTER)).toBe(
      "Bet koks vietų skaičius"
    );

    const matchingSlot = AvailableSeatsSlots[0];
    expect(getSeatsCountText(matchingSlot.key)).toBe("Bet koks vietų skaičius");

    expect(getSeatsCountText("non-existent-key")).toBe("");
  });

  it("should return correct price text", () => {
    expect(getPriceText(true, [10, 20])).toBe("Tik nemokamos kelionės");
    expect(getPriceText(false, [10, 20])).toBe("Nuo 10€ iki 20€");
  });
});
