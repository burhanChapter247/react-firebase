import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { CreateChannelService } from "../../services/firestore";
import { ApplicationStore } from "../../store";

const channelInitialState = {
  name: "",
};

export const Add: React.FC<any> = () => {
  let history = useHistory();
  const [input, setInput] = useState<any>(channelInitialState);
  const userDetails = useSelector((state: ApplicationStore) => {
    return state.auth.userDetails;
  });

  const Create = () => {
    CreateChannelService({ ...input, domainId: userDetails.domainId });
    setInput(channelInitialState);
  };

  const { name } = input;

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
