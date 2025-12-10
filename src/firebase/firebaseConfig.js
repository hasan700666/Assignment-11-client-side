// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_P6PxyEQbkSVpwcRHyIheR0RFDWKHSoo",
  authDomain: "mokhed-4d701.firebaseapp.com",
  projectId: "mokhed-4d701",
  storageBucket: "mokhed-4d701.firebasestorage.app",
  messagingSenderId: "365342635450",
  appId: "1:365342635450:web:99c2473275f2358eb75983",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
