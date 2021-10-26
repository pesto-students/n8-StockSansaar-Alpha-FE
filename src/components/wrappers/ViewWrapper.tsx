import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
export type ViewWrapperProps = {
  header?: any;
  children: any;
};
const useStyles = makeStyles({
  body: {
    height: "80%",
    marginTop: "2rem",
  },
  header: {
    marginTop: "2rem",
  },
});

function ViewWrapper({ header, children }: ViewWrapperProps) {
  const classes = useStyles();
  return (
    <Box sx={{ width: "80vw", margin: "auto", height: "80%" }}>
      <div className={classes.header}>{header}</div>
      <div className={classes.body}>{children}</div>
    </Box>
  );
}

export default ViewWrapper;
