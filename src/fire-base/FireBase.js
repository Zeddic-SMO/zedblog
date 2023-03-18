// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrUTaairiZDw5mEXSpEARh60T6yzB5l20",
  authDomain: "zedblog-ae1b0.firebaseapp.com",
  projectId: "zedblog-ae1b0",
  storageBucket: "zedblog-ae1b0.appspot.com",
  messagingSenderId: "543878267581",
  appId: "1:543878267581:web:299fb26a6395fc7b362dd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
