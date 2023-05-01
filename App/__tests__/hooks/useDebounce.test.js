import { renderHook } from "@testing-library/react-hooks";
import useDebounce from "../../src/hooks/useDebounce";

// describe("useDebounce", () => {
//   it("should return the initial value", () => {
//     const { result } = renderHook(() => useDebounce("initial value"));
//     expect(result.current).toBe("initial value");
//   });

//   it("should debounce the value", () => {
//     jest.useFakeTimers();
//     const { result, rerender } = renderHook(
//       ({ value, delay }) => useDebounce(value, delay),
//       { initialProps: { value: "initial value", delay: 500 } }
//     );

//     expect(result.current).toBe("initial value");
//     rerender({ value: "updated value", delay: 500 });

//     // Wait for 499ms
//     jest.advanceTimersByTime(499);
//     expect(result.current).toBe("initial value");

//     // Wait for another 500ms
//     jest.advanceTimersByTime(500);
//     expect(result.current).toBe("updated value");

//     jest.useRealTimers();
//   });
// });
