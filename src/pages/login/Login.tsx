import { Snackbar, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Alert from "../../components/molecules/Alert";
import CenterCard from "../../components/organisms/CenterCard";
import formValidation from "../../helpers/formValidation";

const WELCOME_MSG = "Welcome Back";
const auth = getAuth();

function LoginPage() {
  const history = useHistory();
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
    setOpenSnackbar(false);
  };

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
        setErrorMessage(error.message);
      });
  };
  useEffect(() => {
    if (auth.currentUser) {
      history.push("/");
    }
  });
  useEffect(() => {
    if (errorMessage !== "") {
      setOpenSnackbar(true);
    }
  }, [errorMessage]);
  const loginCardContent = () => (
    <div className="flex-column marginY">
      <Typography variant="h5">{WELCOME_MSG}</Typography>
      <TextField
        autoFocus
        type="email"
        id="login-email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(event) => formValidation.setFormValidity(event, setEmailError)}
        helperText={emailError ? "Enter Correct Email" : null}
        error={emailError}
        autoComplete="on"
      />
      <TextField
        type="password"
        id="login-password"
        label="Password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <div className="marginY">
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn(email, password)}
        >
          Sign In
        </Button>
        <Typography variant="body2">OR</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <CenterCard width="20rem" content={loginCardContent()} />{" "}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginPage;
