import React, { Fragment } from "react";

import Router from "./router";
//import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_ZlNqiv7vvyZ88Z7pMYdUc1wpyzozPoY",
  authDomain: "mvp-247.firebaseapp.com",
  projectId: "mvp-247",
  storageBucket: "mvp-247.appspot.com",
  messagingSenderId: "564464372652",
  appId: "1:564464372652:web:3fa51a94932b0cfeac0809",
  measurementId: "G-S807CD3SDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}

export default App;
