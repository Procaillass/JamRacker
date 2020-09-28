import firebase from 'firebase'
import 'firebase/firebase-firestore'

let firebaseConfig = {
  apiKey: "AIzaSyBpZOksBzKmqIzXcRD8XIJ0T-dYV8DVl-c",
  authDomain: "jamracker-10e1a.firebaseapp.com",
  databaseURL: "https://jamracker-10e1a.firebaseio.com",
  projectId: "jamracker-10e1a",
  storageBucket: "jamracker-10e1a.appspot.com",
  messagingSenderId: "89348184510",
  appId: "1:89348184510:web:15890bc0781c28ff8401ef"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore()

export {db, fire}

