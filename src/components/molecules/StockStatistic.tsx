import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

const useStyles = makeStyles({
  paperRoot: {
    margin: "1rem",
    padding: "0.5rem",
  },
  key: {
    marginBottom: "0.5rem",
  },
});

type StockStatisticProps = {
  keys: string;
  value: any;
};

const camelCaseToSentence = (text: string) => {
  const result = text.replace(/([A-Z0-9])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

function StockStatistic({ keys, value = "N/A" }: StockStatisticProps) {
  const classes = useStyles();
  console.log(keys, value);
  return (
    <Paper elevation={0} className={classes.paperRoot}>
      <div>
        <Typography variant="body1" className={classes.key}>
          {camelCaseToSentence(keys)}
        </Typography>
      </div>
      <Typography variant="body2">{value}</Typography>
    </Paper>
  );
}

export default StockStatistic;
