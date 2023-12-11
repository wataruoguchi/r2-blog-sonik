import DarkModeToggle from ".";
import { render } from "@testing-library/react";

// Overwrite window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("DarkModeToggle", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DarkModeToggle />);
    expect(baseElement).toBeTruthy();
  });
});
