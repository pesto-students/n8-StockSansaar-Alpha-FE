import React, { ChangeEvent, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import Card from "@mui/material/Card";
import formValidation from "../../helpers/formValidation";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  PASSWORD_NOT_MATCH_TEXT,
  PASSWORD_PATTERN,
} from "../../constants/formValidation";
import axios from "axios";
import CenterCard from "../../components/organisms/CenterCard";

require("../../firebase");

const useStyles = makeStyles({
  loginRoot: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardRoot: { padding: "3rem" },
});

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signIn = (email?: string, password?: string) => {
  console.log(email, password);
  if (!email || !password) {
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
};

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
const signUp = (email?: string, password?: string) => {
  console.log(email, password);
  if (!email || !password) {
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const getHelloWorld = async (token: string) => {
  console.log(token);
  const res = await axios.get(
    "https://fvwiw2gj7j.execute-api.us-west-1.amazonaws.com/dev/hello",
    {
      headers: {
        token,
      },
    }
  );
  console.log(res);
};
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     user.getIdToken().then((token) => {
//       getHelloWorld(token);
//     });
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
function LoginPage() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
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
      <Button onClick={() => signUp(email, password)}>SignUp</Button>
      <Button onClick={() => signIn(email, password)}>SignIn</Button>
    </>
  );
  return <CenterCard content={loginCardContent()} />;
}

export default LoginPage;
