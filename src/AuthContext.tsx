import { getAuth } from "@firebase/auth";
import axios from "axios";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});
const auth = getAuth();
axios.interceptors.request.use(async (config) => {
  config!.headers!.token = (await auth.currentUser?.getIdToken()) || "";
  return config;
});
export const AuthContext = React.createContext({ auth });

export const AuthProvider = ({ children }: any) => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
