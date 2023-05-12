import { render, fireEvent } from "@testing-library/react-native";
import Button, { ButtonColor } from "../../../src/Components/Button/Button.jsx";

describe("Button", () => {
  const mockOnClick = jest.fn();
  const mockText = "Test Button";

  it("renders correctly", () => {
    render(
      <Button text={mockText} onClick={mockOnClick} color={ButtonColor.BLUE} />
    );

    expect(screen.getByText(mockText)).toBeDefined();
  });

  it("handles onPress correctly", () => {
    const { getByText } = render(
      <Button text={mockText} onClick={mockOnClick} color={ButtonColor.BLUE} />
    );

    fireEvent.press(getByText(mockText));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should not fire onPress when disabled", () => {
    const { getByText } = render(
      <Button
        text={mockText}
        onClick={mockOnClick}
        disabled={true}
        color={ButtonColor.BLUE}
      />
    );

    fireEvent.press(getByText(mockText));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
