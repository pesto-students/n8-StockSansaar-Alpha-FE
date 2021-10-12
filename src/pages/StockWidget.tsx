// @ts-nocheck
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Screener } from "react-ts-tradingview-widgets";
const useStyles = makeStyles({
  pageRoot: {
    background: "black",
  },
  hideButton: {
    display: "none",
  },
});
export default function StockWidgetPage() {
  const classes = useStyles();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const enterFullScreen = () => {
    setIsFullScreen(true);
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
    /* tslint:enable */
  };

  return (
    <div className={classes.pageRoot}>
      <Grid>
        <Button
          className={isFullScreen ? classes.hideButton : null}
          onClick={enterFullScreen}
        >
          Enter FullScreen
        </Button>
        <Screener
          colorTheme="dark"
          width="100%"
          height={300}
          market="india"
          defaultScreen="most_capitalized"
        ></Screener>
      </Grid>
    </div>
  );
}
