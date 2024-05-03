// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Your firebase API KEY",
  authDomain: "Your firebase authDomain",
  databaseURL: "Your firebase database URL",
  projectId: "Your firebase Project id",
  storageBucket: "Your firebase storage bucket",
  messagingSenderId: "Your firebase messagingSenderId",
  appId: "Your firebase app id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
