// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_APP_API_KEY),
  authDomain: "royalwatchcompany-f915a.firebaseapp.com",
  databaseURL: "https://royalwatchcompany-f915a-default-rtdb.firebaseio.com",
  projectId: String(import.meta.env.VITE_APP_PROJECT_ID) ,
  storageBucket: "royalwatchcompany-f915a.appspot.com",
  messagingSenderId:String(import.meta.env.VITE_APP_SENDER_ID) ,
  appId: String(import.meta.env.VITE_APP_APP_ID),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getDatabase(app);
const fs = getFirestore(app);
export  { db, storage,fs };
