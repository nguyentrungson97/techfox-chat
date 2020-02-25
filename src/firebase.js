import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDxlokTWLwgZmjkw7CeF_1udupqDY6tftU",
  authDomain: "psyduck-slack-techfox.firebaseapp.com",
  databaseURL: "https://psyduck-slack-techfox.firebaseio.com",
  projectId: "psyduck-slack-techfox",
  storageBucket: "psyduck-slack-techfox.appspot.com",
  messagingSenderId: "84629735914",
  appId: "1:84629735914:web:d74d1a4c599b8369bbca93",
  measurementId: "G-T4KP8BD56N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
