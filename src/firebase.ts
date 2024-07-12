import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4KtUH2ggeSOmcQ_7WJPQpO-WeeNhpJHQ",
  authDomain: "whossy-app.firebaseapp.com",
  projectId: "whossy-app",
  storageBucket: "whossy-app.appspot.com",
  messagingSenderId: "332139466657",
  appId: "1:332139466657:web:26e95148b069f63f2d05e0",
  measurementId: "G-QQ1B249HVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth}