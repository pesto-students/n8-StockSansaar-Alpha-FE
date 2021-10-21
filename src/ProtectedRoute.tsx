import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!auth.currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
