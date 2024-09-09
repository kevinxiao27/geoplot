// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase-admin/app";
import * as admin from "firebase-admin";
import * as client from "firebase/app";
import * as clientauth from "firebase/auth";
import "../../envConfig";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";
import "../../envConfig";

import serviceAccount from "./servicekey.json";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const cert: admin.ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

export const serverApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: admin.credential.cert(cert),
    },
    "firebase-admin-app"
  );
export const serverAuth = getAuth(serverApp);

export const clientApp = !client.getApps().length ? client.initializeApp(firebaseConfig) : client.getApp();
export const clientAuth = clientauth.getAuth(clientApp);
