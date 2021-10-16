// @ts-nocheck
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Screener } from "react-ts-tradingview-widgets";
import ViewWrapper from "../components/wrappers/ViewWrapper";
import styles from "./StockWidget.module.css";

export default function StockScreener() {
  const enterFullScreen = () => {
    // const elem = document.documentElement;
    /* Get the element you want displayed in fullscreen mode (a video in this example): */
    const elem = document.getElementById(styles.screener);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    /* tslint:enable */
  };
  return (
    <ViewWrapper header={"Screener"}>
      <Button onClick={enterFullScreen}>{"Enter FullScreen"}</Button>
      <div id={styles.screener}>
        <Screener
          colorTheme="dark"
          height="100%"
          width="100%"
          market="india"
          defaultScreen="most_capitalized"
        />
      </div>
    </ViewWrapper>
  );
}
