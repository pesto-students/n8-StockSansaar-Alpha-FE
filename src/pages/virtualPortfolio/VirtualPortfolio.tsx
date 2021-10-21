import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import ViewWrapper from "../../components/wrappers/ViewWrapper";

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
