import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import stocksKeyStatsReader from "../../readers/yahooStockKeyStats";
import {
  AdvancedRealTimeChart,
  FundamentalData,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import summaryData from "../../mockdata/keyStatistics";
import ViewWrapper from "../../components/wrappers/ViewWrapper";
import { makeStyles } from "@material-ui/styles";
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
  const classes = useStyles();
  const history = useHistory();
  const { stockName }: any = useParams();
  const keyStatistics = summaryData.result[0].defaultKeyStatistics;
  const symbol = stockName.toUpperCase();

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // queryYahooFinance(EndpointNames.TRENDING).then((result) => {
    //   console.log(result);
    // });
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ViewWrapper header={symbol}>
      <Box display="flex">
        <Box
          sx={{
            width: "40%",
          }}
        >
          <div
            className={classes.keyPoints}
            onClick={() => {
              history.push("fullScreenView");
            }}
          >
            <Typography variant="h3">Key Points</Typography>
            <div>
              52 Week Change:{" "}
              {stocksKeyStatsReader._52WeekChange(keyStatistics)}
            </div>
            <div>
              Insider Holdings:
              {stocksKeyStatsReader.heldPercentInsiders(keyStatistics)}
            </div>
            <div>
              Institutional Holdings:
              {stocksKeyStatsReader.heldPercentInstitutions(keyStatistics)}
            </div>
            <div>
              Peg Ratio:
              {stocksKeyStatsReader.pegRatio(keyStatistics)}
            </div>
            <button
              data-kite="ht2nfgbrmgvtzxnw"
              data-exchange="NSE"
              data-tradingsymbol="SBIN"
              data-transaction_type="BUY"
              data-quantity="1"
              data-order_type="MARKET"
            >
              Buy
            </button>
          </div>
        </Box>
        <Box sx={{ bgcolor: "background.paper", width: "60%", height: "50vh" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="stock data options tab"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Fundamentals" {...a11yProps(1)} />
            <Tab label="Technical" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AdvancedRealTimeChart
              autosize
              theme="dark"
              symbol={`BSE:${symbol}`}
            ></AdvancedRealTimeChart>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FundamentalData autosize colorTheme="dark"></FundamentalData>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TechnicalAnalysis autosize symbol={`BSE:${symbol}`} />
          </TabPanel>
        </Box>
      </Box>
    </ViewWrapper>
  );
}
