import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import app from "../../base.js";
import axios from "axios";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import CenterCard from "../../components/organisms/CenterCard";
import {
  PASSWORD_NOT_MATCH_TEXT,
  PASSWORD_PATTERN,
} from "../../constants/formValidation";
import formValidation from "../../helpers/formValidation";
import { useHistory } from "react-router";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  console.log("hello there");
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(result, token, user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

function LoginPage() {
  const history = useHistory();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const signIn = (email?: string, password?: string) => {
    console.log(email, password);
    if (!email || !password) {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginCardContent = () => (
    <>
      <div>Welcome To Stock Sansaar</div>

      <TextField
        autoFocus
        type="email"
        id="login-email"
        label="email"
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(event) => formValidation.setFormValidity(event, setEmailError)}
        helperText={emailError ? "Enter Correct Email" : null}
        error={emailError}
      />
      <TextField
        type="password"
        id="login-password"
        label="password"
        onChange={(e: any) => setPassword(e.target.value)}
        onBlur={(event) =>
          formValidation.setFormValidity(event, setPasswordError)
        }
        inputProps={{
          pattern: PASSWORD_PATTERN,
        }}
        helperText={passwordError ? PASSWORD_NOT_MATCH_TEXT : null}
        error={passwordError}
      />
      <Button onClick={() => signIn(email, password)}>SignIn</Button>
      <Typography variant="body2">OR</Typography>
      <Button onClick={() => history.push("/signup")}>Sign Up</Button>
    </>
  );
  return <CenterCard content={loginCardContent()} />;
}

export default LoginPage;
