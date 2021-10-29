import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
export type ViewWrapperProps = {
  header?: any;
  children: any;
};
const useStyles = makeStyles({
  body: {
    marginTop: "2rem",
    paddingBottom: "2rem",
  },
  header: {
    marginTop: "2rem",
  },
});

function ViewWrapper({ header, children }: ViewWrapperProps) {
  const classes = useStyles();
  return (
    <Box sx={{ width: "80vw", margin: "auto" }}>
      <div className={classes.header}>{header}</div>
      <div className={classes.body}>{children}</div>
    </Box>
  );
}

export default ViewWrapper;
