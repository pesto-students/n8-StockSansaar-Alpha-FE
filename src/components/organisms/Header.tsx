import {
  AppBar,
  Button,
  FormControlLabel,
  makeStyles,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useHistory } from "react-router";
import Alert from "../molecules/Alert";

const useStyles = makeStyles((theme: Theme) => ({
  navItems: {
    // backgroundColor: theme.palette.background.paper,
    width: "50%",
    // color: "white",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  themeSwitch: {
    marginLeft: "1rem",
  },
  topbar: {
    padding: "0 9rem",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
}));

function TopNav({ themeChange, isDarkMode }: any) {
  const history = useHistory();
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const logoutHandler = () => {
    signOut(auth)
      .then((res) => {
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setLogoutError(error.message);
      });
  };

  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  const auth = getAuth();
  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

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
          <div className={classes.topbar}>
            <Typography variant="h6" component="div">
              StockSansaar
            </Typography>
            <div className={classes.navbar}>
              <FormControlLabel
                control={
                  <Switch defaultChecked={isDarkMode} onChange={themeChange} />
                }
                label="Dark Mode"
                className={classes.themeSwitch}
              />
              {!loggedIn ? (
                <div className={classes.navItems}>Hello</div>
              ) : (
                <>
                  <div className={classes.navItems}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      // textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="top bar navigation tabs"
                    >
                      <Tab label="Portfolio" {...a11yProps(0)} />
                      <Tab
                        label="Strategies"
                        {...a11yProps(1)}
                        onClick={() => history.push("/strategies")}
                      />
                      <Tab label="Explore" {...a11yProps(2)} />
                      <Tab label="Virtual Portfolio" {...a11yProps(3)} />
                      <Tab label="Screener" {...a11yProps(4)} />
                    </Tabs>
                  </div>
                  <Button color="inherit" onClick={logoutHandler}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={logoutError === "" ? "success" : "error"}
        >
          {logoutError === "" ? "You are now Logged Out!" : logoutError}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TopNav;
