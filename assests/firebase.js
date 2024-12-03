// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqx9cICiCwK_jPK8KOWo9s_5-iQwVk96U",
  authDomain: "attendance-app-47822.firebaseapp.com",
  projectId: "attendance-app-47822",
  storageBucket: "attendance-app-47822.firebasestorage.app",
  messagingSenderId: "836478258941",
  appId: "1:836478258941:web:16722b817e3073474db894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();