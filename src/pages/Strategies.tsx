import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import ViewWrapper from "../components/wrappers/ViewWrapper";

export default function Strategies() {
  const [strategies, setStrategies] = React.useState<Array<any>>();
  const history = useHistory();
  React.useEffect(() => {
    if (!strategies) {
      axios.get("http://localhost:7000/strategy/all").then((res) => {
        const allStrategies = res.data || [];
        setStrategies(allStrategies);
      });
    }
  });

  if (!strategies) {
    return <div>Loading...</div>;
  }
  return (
    <ViewWrapper header={<Typography variant="h3">Strategies</Typography>}>
      {strategies.map((strategy: any) => (
        <div
          onClick={() => {
            history.push(`/strategies/${strategy.name}`);
          }}
        >
          <Typography variant="h5">{strategy.name}</Typography>
          <div>
            <Typography variant="body1">{strategy.description}</Typography>
            <ul>
              {strategy.keyPoints.map((point: any) => (
                <li>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </ViewWrapper>
  );
}
