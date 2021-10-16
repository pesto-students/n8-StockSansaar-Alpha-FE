import {
  AppBar,
  Button,
  Snackbar,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router";
import Alert from "../molecules/Alert";

function TopNav({ themeChange }: any) {
  const history = useHistory();
  const auth = getAuth();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            StockSansaar
          </Typography>
          <Switch onChange={themeChange} />
          <Button
            color="inherit"
            onClick={() => {
              signOut(auth)
                .then((res) => {
                  setOpenSnackbar(true);
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          You are now Logged Out!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TopNav;
