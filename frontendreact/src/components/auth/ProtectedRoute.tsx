import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {  
          return (
            <Home title="" >
              <Component {...props} />
            </Home>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};