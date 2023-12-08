import Counter from "./counter";
import { render, screen } from "@testing-library/react";

describe("Counter", () => {
  it("renders", () => {
    render(<Counter />);
    expect(screen.getByText("Increment")).toBeInTheDocument();
  });
});
