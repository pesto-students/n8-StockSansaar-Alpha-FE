// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "stocksansaar.firebaseapp.com",
  projectId: "stocksansaar",
  storageBucket: "stocksansaar.appspot.com",
  messagingSenderId: "590603580450",
  appId: "1:590603580450:web:23aa5b648eafeb4a76c67b",
  measurementId: "G-V7MMM2PXYM"
}; 

// Initialize Firebase
initializeApp(firebaseConfig);
