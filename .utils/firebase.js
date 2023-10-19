// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdypcPRu6twSJvhDj0hnkEbbzHWOhHdTM",
  authDomain: "williams-project-eb009.firebaseapp.com",
  projectId: "williams-project-eb009",
  storageBucket: "williams-project-eb009.appspot.com",
  messagingSenderId: "447513020809",
  appId: "1:447513020809:web:e24285a9a8f13a76eaf958",
  measurementId: "G-6SRQJP7LHV"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
