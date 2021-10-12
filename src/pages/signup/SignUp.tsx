import { Grid, makeStyles, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import CenterCard from "../../components/organisms/CenterCard";
import image from "../../images/signUp.jpg";
import {
  PASSWORD_NOT_MATCH_TEXT,
  PASSWORD_PATTERN,
} from "../../constants/formValidation";
import formValidation from "../../helpers/formValidation";

const auth = getAuth();
const useStyles = makeStyles({
  containerWidth: {
    width: "40rem",
  },
});
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

function SignUpPage() {
  const classes = useStyles();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const signUpContent = () => (
    <>
      <Grid container className={classes.containerWidth}>
        <Grid item xs={6}>
          <TextField
            autoFocus
            type="email"
            id="login-email"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            type="password"
            id="login-password"
            label="Confirm Passwod"
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            onBlur={(event) =>
              formValidation.setFormValidity(event, setPasswordError)
            }
            inputProps={{
              pattern: PASSWORD_PATTERN,
            }}
            helperText={passwordError ? PASSWORD_NOT_MATCH_TEXT : null}
            error={passwordError}
          />
          <div>
            <Button
              disabled={password === confirmPassword ? true : false}
              onClick={() => signUp(email, password)}
            >
              Sign Up
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img src={image} />
        </Grid>
      </Grid>
    </>
  );
  return <CenterCard content={signUpContent()} />;
}

export default SignUpPage;
