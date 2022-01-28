import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { initializeDb } from "../../services/firestore";

const postInitialState = {
  subject: "",
  body: "",
};

export const View: React.FC<any> = (props: any) => {
  let history = useHistory();
  const db = initializeDb();
  const {
    match: { params },
  } = props || {};

  const [input, setInput] = useState(postInitialState);
  const [channel, setChannel] = useState<any>({});
  const [postList, setPostList] = useState<any>([]);

  useEffect(() => {
    const getChannel = async () => {
      const docRef = doc(db, "channel", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setChannel(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getChannel();

    const q = query(
      collection(db, "post"),
      where("channelId", "==", params.id)
    );
    const unsub = onSnapshot(q, (snapshot: any) => {
      const list: any = [];
      snapshot.forEach((postSnapshot: any) => {
        list.push({ id: postSnapshot.id, ...postSnapshot.data() });
      });

      setPostList(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const CreatePost = async () => {
    const docRef = await addDoc(collection(db, "post"), {
      channelId: params.id,
      ...input,
    });
    setInput(postInitialState);
  };

  const viewChannel = (id: string) => {
    history.push(`/post/${id}`);
  };

  const { subject, body } = input;

  return (
    <div>
      <h1>{channel.name}</h1>

      <h4>Add Post</h4>
      <label>Subject: </label>
      <input
        value={subject}
        name="subject"
        onChange={(e) => setInput({ ...input, subject: e.target.value })}
      />

      <label>Body: </label>
      <input
        value={body}
        name="body"
        onChange={(e) => setInput({ ...input, body: e.target.value })}
      />
      <button onClick={CreatePost}>Add</button>
      <button onClick={() => history.push("/")}>go Back</button>

      <h4>List Post</h4>
      <ul>
        {postList.map((list: any) => (
          <li key={list.id} onClick={(e) => viewChannel(list.id)}>
            {list.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
