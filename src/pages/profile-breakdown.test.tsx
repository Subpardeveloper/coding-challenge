import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileBreakdown from "./profile-breakdown";
import GroupContextProvider from "../utils/context";
import { Router, Switch, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

test("triggers groupBy location", async () => {
  const history = createMemoryHistory();
  history.push("/user/20090000846-1");

  render(
    <Router history={history}>
      <GroupContextProvider>
        <Switch>
          <Route path="/user/:id?">
            <ProfileBreakdown />
          </Route>
        </Switch>
      </GroupContextProvider>
    </Router>
  );

  await waitFor(() => screen.getByText(/Asset distribution/i));

  fireEvent.click(screen.getByText(/Group by Asset Location/i));

  await waitFor(() => screen.getByText(/Asset distribution: location/i));

  const byLocation = screen.getByText(/Asset distribution: location/i);

  expect(byLocation).toBeInTheDocument();
});

test("triggers groupBy asset class", async () => {
  const history = createMemoryHistory();
  history.push("/user/20090000846-1");

  render(
    <Router history={history}>
      <GroupContextProvider>
        <Switch>
          <Route path="/user/:id?">
            <ProfileBreakdown />
          </Route>
        </Switch>
      </GroupContextProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Group by Asset Class/i));

  await waitFor(() => screen.getByText(/Asset distribution: class/i));

  const byClass = screen.getByText(/Asset distribution: class/i);

  expect(byClass).toBeInTheDocument();
});
