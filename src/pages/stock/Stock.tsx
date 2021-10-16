import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import stocksKeyStatsReader from "../../readers/yahooStockKeyStats";
import stockSummaryReader from "../../readers/yahooStockSummary";
import {
  AdvancedRealTimeChart,
  FundamentalData,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import statisticsData from "../../mockdata/keyStatistics";
import summaryData from "../../mockdata/stockSummary";
import ViewWrapper from "../../components/wrappers/ViewWrapper";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import StockStatistic from "../../components/molecules/StockStatistic";
import { Button, Popover, useTheme } from "@material-ui/core";
import ArticleIcon from "@material-ui/icons/Description";
import { CompanyProfile } from "react-ts-tradingview-widgets";

import _ from "lodash";
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const useStyles = makeStyles({
  keyPoints: {
    padding: "2rem",
    border: "1px solid black",
    borderRadius: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "60vh" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function StockPage() {
  const {
    palette: { type: themeType },
  } = useTheme();

  const classes = useStyles();
  const { stockName }: any = useParams();
  const keyStatistics = statisticsData.result[0].defaultKeyStatistics;
  const stockSummary = summaryData.result[0].summaryDetail;
  const symbol = stockName.toUpperCase();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // queryYahooFinance(EndpointNames.TRENDING).then((result) => {
    //   console.log(result);
    // });
  });
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // const keyPointsView = () => (
  //   <div className={classes.keyPoints}>
  //     <Typography variant="h3">Key Points</Typography>
  //     <div>
  //       <StockStatistic
  //         keys={"52 Week Change"}
  //         value={stocksKeyStatsReader.technicals._52WeekChange(keyStatistics)}
  //       />
  //     </div>
  //     {/* <div>
  //       Insider Holdings:
  //       {stocksKeyStatsReader.heldPercentInsiders(keyStatistics)}
  //     </div>
  //     <div>
  //       Institutional Holdings:
  //       {stocksKeyStatsReader.heldPercentInstitutions(keyStatistics)}
  //     </div>
  //     <div>
  //       Peg Ratio:
  //       {stocksKeyStatsReader.pegRatio(keyStatistics)}
  //     </div> */}
  //     <button
  //       data-kite="ht2nfgbrmgvtzxnw"
  //       data-exchange="NSE"
  //       data-tradingsymbol="SBIN"
  //       data-transaction_type="BUY"
  //       data-quantity="1"
  //       data-order_type="MARKET"
  //     >
  //       Buy SBI stock
  //     </button>
  //   </div>
  // );

  return (
    <ViewWrapper
      header={
        <div className="flex">
          <Typography variant="h3">{symbol}</Typography>
          <ArticleIcon onClick={handleClick} />
        </div>
      }
    >
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <CompanyProfile colorTheme="dark" height={400}></CompanyProfile>
      </Popover>
      <Box display="flex">
        <Box
          sx={{
            width: "60%",
          }}
        >
          <div className="widget">
            <AdvancedRealTimeChart theme={themeType} symbol={`BSE:${symbol}`} />
          </div>
        </Box>
        <Box sx={{ bgcolor: "background.paper", width: "40%", height: "50vh" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="stock data options tab"
          >
            <Tab label="Price & Vol." {...a11yProps(0)} />
            <Tab label="Fundamentals" {...a11yProps(1)} />
            <Tab label="Technical" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            {Object.entries(stockSummaryReader.technicals).map(([k, v]) => {
              const value = v(stockSummary);
              // @ts-ignore
              return <StockStatistic keys={k} value={value} />;
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* {keyPointsView()} */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TechnicalAnalysis autosize symbol={`BSE:${symbol}`} />
          </TabPanel>
        </Box>
      </Box>
    </ViewWrapper>
  );
}
