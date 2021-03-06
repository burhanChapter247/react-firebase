import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import * as AuthSelectors from "../store/auth/reducer";
import { ApplicationStore } from "../store";

interface PrivateRouteProps {
  component: React.FC;
  redirect?: string;
}
//const isAuth = localStorage.getItem("userDetails") ? true : false;

export const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  component: Component,
  redirect = "/sign-in",
  ...rest
}) => {
  const { isAuth } = useSelector((state: ApplicationStore) => {
    return {
      isAuth: AuthSelectors.isAuth(state),
    };
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

export const RedirectRoute: React.FC<PrivateRouteProps> = () => {
  const { isAuth } = useSelector((state: ApplicationStore) => {
    return {
      isAuth: AuthSelectors.isAuth(state),
    };
  });
  if (!isAuth) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div>
      <h1>Loggin!</h1>
    </div>
  );
};

export const HOCSignIn: React.FC<PrivateRouteProps & RouteProps> = ({
  component: Component,
  redirect = "/",
  ...rest
}) => {
  const { isAuth } = useSelector((state: ApplicationStore) => {
    return {
      isAuth: AuthSelectors.isAuth(state),
    };
  });
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to={redirect} /> : <Component {...props} />
      }
    />
  );
};
