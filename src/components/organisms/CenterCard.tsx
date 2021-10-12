import { makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";

export type CenterCardProps = {
  content: any;
};
const useStyles = makeStyles({
  loginRoot: {
    display: "flex",
    height: `calc(100% - 2em)`,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardRoot: {
    padding: "3rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
});

function CenterCard({ content }: CenterCardProps) {
  const classes = useStyles();
  return (
    <div className={classes.loginRoot}>
      <Card elevation={24} component="form" className={classes.cardRoot}>
        {content}
      </Card>
    </div>
  );
}

export default CenterCard;
