import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as AuthActions from "../store/auth/actions";

export const WelcomeScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Dashboard!</h1>
      <button onClick={() => dispatch(AuthActions.signOut())}> Logout</button>
    </div>
  );
};

export default WelcomeScreen;
