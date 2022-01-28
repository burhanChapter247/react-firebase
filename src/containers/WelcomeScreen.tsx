import React from "react";
import { Route, RouteProps, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as AuthActions from "../store/auth/actions";
import { ApplicationStore } from "../store";

export const WelcomeScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const userDetails = useSelector((state: ApplicationStore) => {
    console.log("userDetailsuserDetailsuserDetailsuserDetails", state);
    return state.auth.userDetails;
  });

  //userDetails.email && <Redirect to="/channel" />;

  return (
    <div>
      <h1>Dashboard!</h1>
      <h3>Howdy, {userDetails.name}</h3>
      <button onClick={() => history.push("/channel")}>New channel</button>
      <button onClick={() => dispatch(AuthActions.signOut())}> Logout</button>
    </div>
  );
};

export default WelcomeScreen;
