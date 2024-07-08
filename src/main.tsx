import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

console.log(analytics)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
