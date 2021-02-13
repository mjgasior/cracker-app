import React from "react";
import { render } from "@testing-library/react";
import { Home } from "./Home";

test("renders main home page", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/with Cracker/i);
  expect(linkElement).toBeInTheDocument();
});
