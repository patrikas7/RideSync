import { render, fireEvent } from "@testing-library/react-native";
import BookmarkCard from "../../../src/Components/Bookmark/BookmarkCard.jsx";
import { TripOptions } from "../../../src/Components/Filters/FiltersConstants";

describe("BookmarkCard", () => {
  const mockOnPress = jest.fn();
  const mockItem = {
    departure: "New York",
    destination: "San Francisco",
    tripOption: "BUS",
    departureTime: "MORNING",
    availableSeats: 3,
    onlyFreeTrips: false,
    priceRange: [100, 200],
  };

  it("renders correctly", () => {
    const { getByText } = render(
      <BookmarkCard item={mockItem} index={0} onPress={mockOnPress} />
    );

    expect(
      getByText(`${mockItem.departure} - ${mockItem.destination}`)
    ).toBeTruthy();
    expect(getByText(TripOptions[mockItem.tripOption])).toBeTruthy();
  });

  it("handles onPress correctly", () => {
    const { getByText } = render(
      <BookmarkCard item={mockItem} index={0} onPress={mockOnPress} />
    );

    fireEvent.press(
      getByText(`${mockItem.departure} - ${mockItem.destination}`)
    );
    expect(mockOnPress).toHaveBeenCalled();
  });
});
