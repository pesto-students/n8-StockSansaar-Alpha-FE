import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

function TopNav() {
  const auth = getAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Todo Add logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
