import { AppBar, Button, Card, Toolbar, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
const useStyles = makeStyles({});

function TopNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Todo Add logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StockSansaar
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopNav;
