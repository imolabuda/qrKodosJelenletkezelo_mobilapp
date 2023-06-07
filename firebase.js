// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcZ7COgeiY0ldywuM5YF0hHYDV4kmL_KA",
  authDomain: "qrcodeproject-c6d04.firebaseapp.com",
  projectId: "qrcodeproject-c6d04",
  storageBucket: "qrcodeproject-c6d04.appspot.com",
  messagingSenderId: "699558294455",
  appId: "1:699558294455:web:0a8a7c424d0e2fbf53ee32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);