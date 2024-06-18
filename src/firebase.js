// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD7liBHHL_YsVwhvZxYJ90Z5WFFxBybzU",
  authDomain: "alumni-portal-df4f5.firebaseapp.com",
  projectId: "alumni-portal-df4f5",
  storageBucket: "alumni-portal-df4f5.appspot.com",
  messagingSenderId: "883092221621",
  appId: "1:883092221621:web:13c7e73eae92ca0d2798fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app);

// Firestore
const db= getFirestore(app);

export {auth, db,storage};