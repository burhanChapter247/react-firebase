import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Add: React.FC<any> = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Create Channel!</h1>
      <button onClick={() => <Redirect to={"/"} />}>Add</button>
    </div>
  );
};

export default Add;
