// @ts-nocheck
import { Button, Theme, Typography, useTheme } from "@material-ui/core";

import React from "react";
import { Screener } from "react-ts-tradingview-widgets";
import ViewWrapper from "../components/wrappers/ViewWrapper";
import styles from "./StockWidget.module.css";

export default function StockScreener() {
  const theme: Theme = useTheme();
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
    <ViewWrapper header={<Typography variant="h3">Screener</Typography>}>
      <Button onClick={enterFullScreen}>{"Enter FullScreen"}</Button>
      <div id={styles.screener}>
        <Screener
          colorTheme={theme.palette.type}
          height="100%"
          width="100%"
          market="india"
          defaultScreen="most_capitalized"
        />
      </div>
    </ViewWrapper>
  );
}
