import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from '@firebase/auth'
import admin from 'firebase-admin'
import { readFileSync } from 'fs';
const serviceAccount = JSON.parse(readFileSync('./eliticket-app-firebase-adminsdk-bppdo-8fc95ce09e.json', 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firebaseConfig = {
  apiKey: "AIzaSyDVsqgtuQ4-CIOZFB1N_V_REjXsEOQtJhA",
  authDomain: "eliticket-app.firebaseapp.com",
  projectId: "eliticket-app",
  storageBucket: "eliticket-app.appspot.com",
  messagingSenderId: "449555430949",
  appId: "1:449555430949:web:f41d6d40d83922f1b3c9cc",
  measurementId: "G-V2DEGRFTH2"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth()

export { app, auth, admin }