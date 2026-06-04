import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

vi.mock("framer-motion", () => {
  const motionProxy = new Proxy(
    {},
    {
      get: (_, element: string) =>
        React.forwardRef(({ children, ...props }: any, ref: React.Ref<any>) =>
          React.createElement(element, { ref, ...props }, children),
        ),
    },
  );

  return {
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    motion: motionProxy,
  };
});

window.scrollTo = vi.fn();

import App from "../App";

describe("App", () => {
  it("renders the LuxeStays home page", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "LuxeStays" })).toHaveAttribute("href", "/");
  });
});