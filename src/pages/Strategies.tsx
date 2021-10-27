import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import ViewWrapper from "../components/wrappers/ViewWrapper";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  strategyCard: {
    padding: "2rem",
    marginBottom: "2rem",
    borderRadius: "2rem",
  },
  underLine: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default function Strategies() {
  const classes = useStyles();
  const [strategies, setStrategies] = React.useState<Array<any>>();
  const history = useHistory();
  async function getStrategies() {
    axios.get("http://localhost:7000/strategy/all").then((res) => {
      const allStrategies = res.data || [];
      setStrategies(allStrategies);
    });
  }
  React.useEffect(() => {
    if (!strategies) {
      getStrategies();
    }
  });

  if (!strategies) {
    return <div>Loading...</div>;
  }
  return (
    <ViewWrapper header={<Typography variant="h3">Strategies</Typography>}>
      {strategies.map((strategy: any) => (
        <Card className={classes.strategyCard}>
          <Typography
            variant="h4"
            className={classes.underLine}
            onClick={() => {
              history.push({
                pathname: `/strategies/${strategy.name}`,
                state: {
                  strategyData: strategy,
                },
              });
            }}
            gutterBottom={true}
          >
            {strategy.name}
          </Typography>
          <div>
            <Typography variant="body2">{strategy.description}</Typography>
            <ul>
              {strategy.keyPoints.map((point: any) => (
                <li>{point}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </ViewWrapper>
  );
}
