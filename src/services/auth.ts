import { TYPES_CONST } from "../env";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const AuthSignInService = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        //console.log("useruseruseruseruseruser", user);
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
