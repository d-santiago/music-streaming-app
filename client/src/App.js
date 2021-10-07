import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
};

export default App;