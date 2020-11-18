import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders welcome screen", () => {
  render(<App />);
  const welcome = screen.getByText(/welcome/i);
  expect(welcome).toBeInTheDocument();
});

test("renders sidebar", () => {
  render(<App />);
  const sidebar = screen.getByText(/Manage Portfolios/i);
  expect(sidebar).toBeInTheDocument();
});

test("renders profile breakdown screen", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/Manage Portfolios/i));

  await waitFor(() => screen.getByText(/Frederic Wiek/i));

  await waitFor(() => fireEvent.click(screen.getByText(/Frederic Wiek/i)));

  const main = screen.getByTestId("test-id-profile-breakdown");

  expect(main).toBeInTheDocument();
});
