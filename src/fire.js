import firebase from 'firebase'
import 'firebase/firebase-firestore'

let firebaseConfig = {
  apiKey: "AIzaSyDbBTAwENRWhLgAk6DQrsxIAIc7El7pfWg",
  authDomain: "jamracker-776e7.firebaseapp.com",
  databaseURL: "https://jamracker-776e7.firebaseio.com",
  projectId: "jamracker-776e7",
  storageBucket: "jamracker-776e7.appspot.com",
  messagingSenderId: "1050958000929",
  appId: "1:1050958000929:web:80169be7966a214b840460"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore()

export { db, fire }

