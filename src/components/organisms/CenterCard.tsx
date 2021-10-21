import { makeStyles, Theme } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";

export type CenterCardProps = {
  content: any;
  width?: string;
};

export interface StyleProps {
  width?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  loginRoot: {
    display: "flex",
    height: `calc(100% - 4rem)`,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardRoot: {
    padding: "3rem",
    textAlign: "center",
    width: (props: any) => {
      return props.width;
    },
    display: "flex",
    flexDirection: "column",
  },
}));

function CenterCard({ content, width }: CenterCardProps) {
  const classes = useStyles({ width });
  return (
    <div className={classes.loginRoot}>
      <Card elevation={24} component="form" className={classes.cardRoot}>
        {content}
      </Card>
    </div>
  );
}

export default CenterCard;
