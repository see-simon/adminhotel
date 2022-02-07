import firebase from "firebase";
import "firebase/storage";

const Config = {
  apiKey: "AIzaSyBUPSgw5FVcqegYiVJEyvZnUBbPD5o5L9c",
  authDomain: "codetripe1.firebaseapp.com",
  projectId: "codetripe1",
  storageBucket: "codetripe1.appspot.com",
  messagingSenderId: "930880363923",
  appId: "1:930880363923:web:165cda42e547d58bae5c66",
  measurementId: "G-6RN73BPSX4"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);
  // firebase.analytics();

const storage = firebase.storage()

export  { storage , firebase as default};