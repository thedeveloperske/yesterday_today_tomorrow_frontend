import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-7_O-dIMbCzZLihlCtLlp1b2ZEf88cC0",
  authDomain: "projects-b39cf.firebaseapp.com",
  projectId: "projects-b39cf",
  storageBucket: "projects-b39cf.firebasestorage.app",
  messagingSenderId: "904315981342",
  appId: "1:904315981342:web:de2d9c73e934f04b90a80f",
  measurementId: "G-GZL6NXP642",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// FirebaseConfig is no longer needed for auth, can be deleted if not used elsewhere

export { app, auth, db };
