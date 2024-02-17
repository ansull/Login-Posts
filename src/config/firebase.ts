// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from'firebase/auth';
import {getFirestore} from'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChi4oX_ne5A0QHPsbuTUWzXq690y-_lrU",
  authDomain: "react-1-d2a53.firebaseapp.com",
  projectId: "react-1-d2a53",
  storageBucket: "react-1-d2a53.appspot.com",
  messagingSenderId: "624908417140",
  appId: "1:624908417140:web:e244a96c6b8f6d0ba57921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);