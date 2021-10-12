import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Box from "@material-ui/core/Box";

function TopNav() {
  const auth = getAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Todo Add logo */}
          <Typography variant="h6" component="div">
            StockSansaar
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              signOut(auth)
                .then((res) => {
                  console.log("Logout Successful: ", res);
                  // Sign-out successful.
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
    </Box>
  );
}

export default TopNav;
