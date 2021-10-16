import { Grid, makeStyles, Snackbar, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import CenterCard from "../../components/organisms/CenterCard";
import image from "../../images/signUp.jpg";
import Alert from "../../components/molecules/Alert";

import {
  PASSWORD_NOT_MATCH_TEXT,
  PASSWORD_PATTERN,
} from "../../constants/formValidation";
import formValidation from "../../helpers/formValidation";
import { useHistory } from "react-router";

const auth = getAuth();
const useStyles = makeStyles({
  containerWidth: {
    width: "40rem",
  },
});

//snackbar

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
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
        setOpenSnackbar(true);
        setTimeout(() => history.push("/"), 3000);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

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
              disabled={password === confirmPassword ? false : true}
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
  return (
    <>
      <CenterCard content={signUpContent()} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Signup Successful! Redirecting to Home Page!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUpPage;
