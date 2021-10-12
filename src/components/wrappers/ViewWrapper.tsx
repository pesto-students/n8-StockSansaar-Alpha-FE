import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
export type ViewWrapperProps = {
  header: any;
  children: any;
};
const useStyles = makeStyles({
  body: {
    height: "80%",
    marginTop: "2rem",
  },
});

function ViewWrapper({ header, children }: ViewWrapperProps) {
  const classes = useStyles();
  return (
    <Box sx={{ mx: 10, my: 5, px: 10, height: "80%" }}>
      {header}
      <div className={classes.body}>{children}</div>
    </Box>
  );
}

export default ViewWrapper;
