import React from "react";
import { render, screen } from "@testing-library/react";
import ActionsMenu from "./actions-menu";

test("renders grouping actions", () => {
  render(<ActionsMenu />);
  const byLocation = screen.getByText(/Group by Asset Location/i);
  const byAssetAllocation = screen.getByText(/Group by Asset Class/i);

  expect(byLocation).toBeInTheDocument();
  expect(byAssetAllocation).toBeInTheDocument();
});
