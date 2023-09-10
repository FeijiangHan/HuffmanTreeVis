import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const REACT_APP_API_KEY = "AIzaSyDzV87sshusztpGPgVSMoKCEi1KKFwHvL8"
const REACT_APP_AUTH_DOMAIN= "hospital-system-89eac.firebaseapp.com"
const REACT_APP_DATABASE_URL= "https://hospital-system-89eac-default-rtdb.asia-southeast1.firebasedatabase.app"
const REACT_APP_PROJECT_ID= "hospital-system-89eac"
const REACT_APP_STORAGE_BUCKET= "hospital-system-89eac.appspot.com"
const REACT_APP_MESSAGING_SENDER_ID= "364096679534"
const REACT_APP_FIREBASE_APP_ID= "1:364096679534:web:bf3d4d2d9ccf631cbec07f";

const app = initializeApp({
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});
// console.log({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });


export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;