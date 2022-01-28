import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { ApplicationStore } from "../../store";

import { initializeDb } from "../../services/firestore";

export const List: React.FC<any> = () => {
  let history = useHistory();
  const db = initializeDb();
  const [channelList, setChannelList] = useState<any>([]);

  const userDetails = useSelector((state: ApplicationStore) => {
    return state.auth.userDetails;
  });

  useEffect(() => {
    const q = query(
      collection(db, "channel"),
      where("domainId", "==", userDetails.domainId)
    );

    const unsub = onSnapshot(q, (snapshot: any) => {
      const list: any = [];
      snapshot.forEach((channelSnapshot: any) => {
        list.push({ id: channelSnapshot.id, ...channelSnapshot.data() });
      });

      setChannelList(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const viewChannel = (id: string) => {
    history.push(`/channel/${id}`);
  };

  return (
    <div>
      <h1>List Channel!</h1>
      <ul>
        {channelList.map((list: any) => (
          <li key={list.id} onClick={(e) => viewChannel(list.id)}>
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
