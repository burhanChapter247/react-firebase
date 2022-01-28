import { TYPES_CONST } from "../env";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { initializeDb } from "./firestore";

export const AuthSignInService = async () => {
  const db = initializeDb();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = { ...result.user, domainId: "" };

        const domain = user.email?.split("@")[1] || "";

        const q = query(collection(db, "domain"), where("name", "==", domain));
        const docSnap = await getDocs(q);
        let domainId: null | string = null;
        docSnap.forEach((doc) => {
          domainId = doc.id;
        });

        if (!domainId) {
          const docRef = await addDoc(collection(db, "domain"), {
            name: domain,
          });

          domainId = docRef.id;
        }

        user.domainId = domainId;
        resolve(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject(credential);
        // ...
      });
  });
};

export function setToken(value: any) {
  localStorage.setItem(TYPES_CONST.TOKEN_NAME, JSON.stringify(value));
}

export function getToken() {
  return localStorage.getItem(TYPES_CONST.TOKEN_NAME);
}

export function removeToken() {
  return localStorage.removeItem(TYPES_CONST.TOKEN_NAME);
}
