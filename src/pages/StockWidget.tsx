// @ts-nocheck
import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router";
import {
  FundamentalData,
  MiniChart,
  SymbolInfo,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import ViewWrapper from "../components/wrappers/ViewWrapper";
import styles from "./StockWidget.module.css";

export default function StockWidgetPage() {
  const { stockName }: any = useParams();
  const symbol = stockName.toUpperCase();
  // const classes = useStyles();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const enterFullScreen = () => {
    const elem = document.documentElement;
    /* tslint:disable */
    /* When the openFullscreen() function is executed, open the video in fullscreen.
  Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    setIsFullScreen(true);
    /* tslint:enable */
  };
  function closeFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  }
  return (
    <ViewWrapper header={<Typography variant="h3">{symbol}</Typography>}>
      <Button onClick={isFullScreen ? closeFullScreen : enterFullScreen}>
        {isFullScreen ? "Exit FullScreen" : "Enter FullScreen"}
      </Button>
      <div class={styles.widget}>
        <SymbolInfo
          symbol={`BSE:${symbol}`}
          colorTheme={theme.palette.type}
          autosize
        />
      </div>
      <Grid container>
        <Grid item xs={6}>
          <div class={styles.widget}>
            <MiniChart
              colorTheme={theme.palette.type}
              symbol={`BSE:${symbol}`}
            ></MiniChart>
          </div>
          <div class={styles.widget}>
            <TechnicalAnalysis
              symbol={`BSE:${symbol}`}
              colorTheme={theme.palette.type}
            ></TechnicalAnalysis>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div class={styles.widget}>
            <FundamentalData
              xs={6}
              symbol={`BSE:${symbol}`}
              colorTheme={theme.palette.type}
            ></FundamentalData>
          </div>
        </Grid>
      </Grid>
    </ViewWrapper>
  );
}
