// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBsMrW9kkKZBhwqc_xNaPwAyzUHltnuK6c",
  authDomain: "expense-tracker-app-e7c3d.firebaseapp.com",
  projectId: "expense-tracker-app-e7c3d",
  storageBucket: "expense-tracker-app-e7c3d.appspot.com",
  messagingSenderId: "936388854467",
  appId: "1:936388854467:web:1ffe2af07a00bc29e4d876",
  measurementId: "G-P7LCJGVBCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);