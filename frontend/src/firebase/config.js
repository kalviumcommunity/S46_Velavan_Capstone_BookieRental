// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAusv-PrLKlnxnLy8CwG9-nMbnXmOqsiMY",
  authDomain: "bookierental.firebaseapp.com",
  projectId: "bookierental",
  storageBucket: "bookierental.appspot.com",
  messagingSenderId: "118124874794",
  appId: "1:118124874794:web:f5ba3f5cc5f23b8b078753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);