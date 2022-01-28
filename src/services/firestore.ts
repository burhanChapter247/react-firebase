import { TYPES_CONST, fireBaseConfig } from "../env";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const initializeDb = () => {
  const app = initializeApp(fireBaseConfig);
  // Get a reference to the database service
  return getFirestore(app);
};

export const CreateChannelService = async (fields: any) => {
  try {
    const db = initializeDb();
    const docRef = await addDoc(collection(db, "channel"), fields);
    alert("Channel added successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
