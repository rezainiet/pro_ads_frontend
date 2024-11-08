// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5_l22cf1-X8JyN3D3q74dM6WO4qvW_Ro",
    authDomain: "ads-agency-f1e4a.firebaseapp.com",
    projectId: "ads-agency-f1e4a",
    storageBucket: "ads-agency-f1e4a.appspot.com",
    messagingSenderId: "1009626406869",
    appId: "1:1009626406869:web:d2edd3d01a9f8b8a21675c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
export default auth;
