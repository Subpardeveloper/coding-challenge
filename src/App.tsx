import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfileBreakdown from "./pages/profile-breakdown";
import Layout from "./layouts/layout";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import GroupContextProvider from "./utils/context";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./overrides.scss";

function App() {
  return (
    <div className="App">
      <header />
      <main>
        <Layout>
          <Router>
            <GroupContextProvider>
              <Sidebar />
              <Switch>
                <Route path="/user/:id?">
                  <ProfileBreakdown />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </GroupContextProvider>
          </Router>
        </Layout>
      </main>
    </div>
  );
}

export default App;
