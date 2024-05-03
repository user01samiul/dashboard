// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArVBx1yf0Int7J7VmcVAMMJPoSri5JrkU",
  authDomain: "dashboard-3ea9d.firebaseapp.com",
  databaseURL: "https://dashboard-3ea9d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dashboard-3ea9d",
  storageBucket: "dashboard-3ea9d.appspot.com",
  messagingSenderId: "480606938960",
  appId: "1:480606938960:web:dabbfa26e3299c693dee55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;