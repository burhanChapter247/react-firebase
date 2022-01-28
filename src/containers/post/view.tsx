import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { initializeDb } from "../../services/firestore";

import PostResponse from "./response";

export const View: React.FC<any> = (props: any) => {
  let history = useHistory();
  const db = initializeDb();
  const {
    match: { params },
  } = props || {};

  const [post, setPost] = useState<any>({});

  useEffect(() => {
    const getPost = async () => {
      const docRef = doc(db, "post", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getPost();
  }, []);

  return (
    <div>
      <h1>{post.subject}</h1>
      <p>{post.body}</p>
      <PostResponse postId={params.id} />
      <br />
      <br />
      <button onClick={() => history.push("/")}>go Back</button>
    </div>
  );
};

export default View;
