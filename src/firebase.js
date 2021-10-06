// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy8QFbid-XlpSbM7ZAB_vpRX_6CEBzUps",
  authDomain: "color-palette-1303c.firebaseapp.com",
  projectId: "color-palette-1303c",
  storageBucket: "color-palette-1303c.appspot.com",
  messagingSenderId: "815578993983",
  appId: "1:815578993983:web:940351fc0c07781a62ef8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore()
export default db;