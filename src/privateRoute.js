import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ ...args }) => {
  return <Route {...args} />;
};

export default PrivateRoute;
