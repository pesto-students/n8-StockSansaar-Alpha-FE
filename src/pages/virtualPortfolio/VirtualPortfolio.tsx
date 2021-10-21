import Box from "@material-ui/core/Box";
import React, { useContext } from "react";
import ViewWrapper from "../../components/wrappers/ViewWrapper";
import { Button, Tab, Tabs, Typography } from "@material-ui/core";

import clsx from "clsx";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

export default function VirtualPortfolio() {
  const { auth } = useContext(AuthContext);
  const createPortfolio = () => {
    axios
      .post("http://localhost:7000/virtual_portfolio/create", {
        name: "Portfolio 3",
        user: auth.currentUser?.uid,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <ViewWrapper
      header={
        <div className={clsx("flex")}>
          <Typography variant="h3">Virtual Portfolio</Typography>
        </div>
      }
    >
      <Button variant="contained" onClick={createPortfolio}>
        Create Portfolio
      </Button>
    </ViewWrapper>
  );
}
