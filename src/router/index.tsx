import React, { Fragment } from "react";

import { Switch, Route } from "react-router-dom";

import { HOCSignIn, PrivateRoute, RedirectRoute } from "./router-hocs";

import SignInScreen from "../containers/SignInScreen";
import WelComeScreen from "../containers/WelcomeScreen";
import AddChannel from "../containers/channel/add";
import ViewChannel from "../containers/channel/view";
import ViewPost from "../containers/post/view";

const Router: React.FC = (props) => {
  return (
    <Fragment>
      <Switch>
        <HOCSignIn path="/sign-in" component={SignInScreen} />

        <PrivateRoute path="/channel/:id" component={ViewChannel} />
        <PrivateRoute path="/channel" component={AddChannel} />
        <PrivateRoute path="/post/:id" component={ViewPost} />
        <PrivateRoute exact path="/" component={WelComeScreen} />

        <Route exact path="/" component={RedirectRoute} />
      </Switch>
    </Fragment>
  );
};

export default Router;
