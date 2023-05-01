import { renderHook } from "@testing-library/react-hooks";
import useScreenArrowBack from "../../src/hooks/useScreenArrowBack";

// describe("useScreenArrowBack", () => {
//   const navigation = {
//     setOptions: jest.fn(),
//     navigate: jest.fn(),
//   };

//   const prevPage = "PreviousPage";
//   const props = { id: 123 };

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should call navigation.setOptions with the correct headerLeft prop", () => {
//     renderHook(() => useScreenArrowBack(navigation, prevPage, props));

//     expect(navigation.setOptions).toHaveBeenCalledWith({
//       headerLeft: expect.any(Function),
//     });
//   });

//   it("should call navigation.navigate with the correct arguments when headerLeft is pressed", () => {
//     const { result } = renderHook(() =>
//       useScreenArrowBack(navigation, prevPage, props)
//     );
//     const headerLeft = result.current.headerLeft();

//     headerLeft.props.onPress();

//     expect(navigation.navigate).toHaveBeenCalledWith(prevPage, { ...props });
//   });
// });
