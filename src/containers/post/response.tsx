import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
  documentId,
} from "firebase/firestore";

import { initializeDb } from "../../services/firestore";
import { ApplicationStore } from "../../store";

const responseInitialState = {
  message: "",
};

export const Response: React.FC<any> = (props) => {
  const db = initializeDb();
  const { postId } = props || {};
  const [input, setInput] = useState<any>(responseInitialState);
  const [responseList, setResponseList] = useState<any>([]);
  const userDetails = useSelector((state: ApplicationStore) => {
    return state.auth.userDetails;
  });

  useEffect(() => {
    const q = query(
      collection(db, "response"),
      where("postId", "==", postId),
      orderBy(documentId(), "desc")
    );
    const unsub = onSnapshot(q, (snapshot: any) => {
      const list: any = [];
      snapshot.forEach((responseSnapshot: any) => {
        list.push({ id: responseSnapshot.id, ...responseSnapshot.data() });
      });

      setResponseList(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const Add = async () => {
    const docRef = await addDoc(collection(db, "response"), {
      postId: postId,
      userName: userDetails.name,
      userId: userDetails.id,
      ...input,
    });
    setInput(responseInitialState);
  };

  const { message } = input;

  return (
    <div>
      <h1>List Response</h1>
      <ul>
        {responseList.map((list: any) => (
          <li key={list.id}>{`${list.userName}: ${list.message}`}</li>
        ))}
      </ul>

      <h1>Add Response!</h1>
      <input
        value={message}
        name="message"
        onChange={(e) => setInput({ ...input, message: e.target.value })}
      />
      <button onClick={Add}>Add</button>
    </div>
  );
};

export default Response;
