import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/auth/actions";

export default function SignIn() {
  const dispatch = useDispatch();

  return (
    <>
      <h1>Login here</h1>
      <button onClick={() => dispatch(AuthActions.signIn())}>Sign In</button>
    </>
  );
}
