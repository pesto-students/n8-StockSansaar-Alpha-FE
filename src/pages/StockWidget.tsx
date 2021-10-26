// @ts-nocheck
import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import {
  FundamentalData,
  MiniChart,
  SymbolInfo,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import ViewWrapper from "../components/wrappers/ViewWrapper";
import styles from "./StockWidget.module.css";

const useStyles = makeStyles({
  fullScreenButton: {
    marginLeft: "1rem",
  },
  hide: {
    display: "none",
  },
  margin: {
    margin: "1rem",
  },
});

export default function StockWidgetPage() {
  const classes = useStyles();
  const theme = useTheme();
  const { stockName }: any = useParams();
  const symbol = stockName.toUpperCase();
  return (
    <ViewWrapper
      header={
        <Typography className={classes.margin} variant="h3">
          {symbol}
        </Typography>
      }
    >
      <div id="widget-view">
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
      </div>
    </ViewWrapper>
  );
}
