// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmqSenOpkbprHKcMu-sss01HIjskvE_QQ",
    authDomain: "react-native-course-cb449.firebaseapp.com",
    databaseURL:
        "https://react-native-course-cb449-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-native-course-cb449",
    storageBucket: "react-native-course-cb449.appspot.com",
    messagingSenderId: "488072584912",
    appId: "1:488072584912:web:03e271ec2d5b074e99c8d5",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const user = auth.currentUser

export {app, database, user};
