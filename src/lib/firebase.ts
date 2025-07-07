// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuECq9LLCQfqC4c5tR5HPf4BX8xSCnsNA",
  authDomain: "lawyer-c179e.firebaseapp.com",
  projectId: "lawyer-c179e",
  storageBucket: "lawyer-c179e.firebasestorage.app",
  messagingSenderId: "570856385645",
  appId: "1:570856385645:web:906f0ae4012c65b8fa2364",
  measurementId: "G-44FBNF3WDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);