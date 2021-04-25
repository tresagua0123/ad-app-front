import React from 'react';
import Home from "src/pages/Home"; 
import './App.css';
// import { Auth } from "src/components/templates/Auth";
import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <>
    {/* <Auth /> */}
    <Home />
  </>
  )
}

export default App;
