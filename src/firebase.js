// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYOv6MMCsYK17BJ7h51DGE14eAZSXUm0M",
  authDomain: "podcast-platform-f77e4.firebaseapp.com",
  projectId: "podcast-platform-f77e4",
  storageBucket: "podcast-platform-f77e4.appspot.com",
  messagingSenderId: "689903698577",
  appId: "1:689903698577:web:b94139a81d8cb367f93530",
  measurementId: "G-LS7SV41Q4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const storage= getStorage(app);
const auth= getAuth(app);

export {auth, db, storage}