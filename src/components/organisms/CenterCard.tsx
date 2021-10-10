import { Card } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
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
  cardRoot: { padding: "3rem" },
});

function CenterCard({ content }: CenterCardProps) {
  const classes = useStyles();
  return (
    <div className={classes.loginRoot}>
      <Card
        elevation={24}
        component="form"
        sx={{
          padding: "3rem",
          textAlign: "center",
          "& .MuiTextField-root": { m: 1, width: "25ch", display: "block" },
        }}
      >
        {content}
      </Card>
    </div>
  );
}

export default CenterCard;
