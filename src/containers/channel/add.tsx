import React, { useState } from "react";
import { Route, RouteProps, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CreateChannelService } from "../../services/firestore";

const channelInitialState = {
  name: "",
};

export const Add: React.FC<any> = () => {
  let history = useHistory();
  const [input, setInput] = useState<any>(channelInitialState);

  const { name } = input;

  const Create = () => {
    CreateChannelService(input);
    setInput(channelInitialState);
  };

  return (
    <div>
      <h1>Create Channel!</h1>
      <input
        value={name}
        name="name"
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <button onClick={Create}>Add</button>
      <button onClick={() => history.push("/")}>go Back</button>
    </div>
  );
};

export default Add;
