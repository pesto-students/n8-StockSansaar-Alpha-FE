import { Button, Popover, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ArticleIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useParams } from "react-router-dom";
import {
  AdvancedRealTimeChart,
  CompanyProfile,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import StockStatistic from "../../components/molecules/StockStatistic";
import ViewWrapper from "../../components/wrappers/ViewWrapper";
import statisticsData from "../../mockdata/keyStatistics";
import summaryData from "../../mockdata/stockSummary";
import stockSummaryReader from "../../readers/yahooStockSummary";
import stockStatsReader from "../../readers/yahooStockKeyStats";
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
        <Box sx={{ p: 3 }}>
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
  const theme = useTheme();

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

  return (
    <ViewWrapper
      header={
        <div className={classes.header}>
          <div className="flex">
            <Typography variant="h3">{symbol}</Typography>
            <ArticleIcon onClick={handleClick} />
          </div>
          <div>
            <button
              data-kite="ht2nfgbrmgvtzxnw"
              data-exchange="NSE"
              data-tradingsymbol="SBIN"
              data-transaction_type="BUY"
              data-quantity="1"
              data-order_type="MARKET"
            >
              Buy SBI stock
            </button>

            <Button variant="contained" color="primary">
              Magic View
            </Button>
          </div>
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
        <CompanyProfile
          colorTheme={theme.palette.type}
          height={400}
          symbol={`BSE:${symbol}`}
        ></CompanyProfile>
      </Popover>
      <Box display="flex">
        <Box
          sx={{
            width: "60%",
          }}
        >
          <div className="widget">
            <AdvancedRealTimeChart
              theme={theme.palette.type}
              symbol={`BSE:${symbol}`}
            />
          </div>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "40%",
            // overflow: "scroll",
            margin: "1rem",
            borderRadius: "2rem",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="stock data options tab"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Price & Vol." {...a11yProps(0)} />
            <Tab label="Fundamentals" {...a11yProps(1)} />
            <Tab label="Technical" {...a11yProps(2)} />
            <Tab label="Others" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            {Object.entries(stockSummaryReader.price).map(([k, v]) => {
              const value = v(stockSummary);
              // @ts-ignore
              return <StockStatistic keys={k} value={value} />;
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {Object.entries(stockStatsReader.fundamentals).map(([k, v]) => {
              const value = v(keyStatistics);
              // @ts-ignore
              return <StockStatistic keys={k} value={value} />;
            })}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {Object.entries(stockSummaryReader.technicals).map(([k, v]) => {
              const value = v(stockSummary);
              // @ts-ignore
              return <StockStatistic keys={k} value={value} />;
            })}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {Object.entries(stockStatsReader.others).map(([k, v]) => {
              const value = v(keyStatistics);
              // @ts-ignore
              return <StockStatistic keys={k} value={value} />;
            })}
          </TabPanel>
        </Box>
      </Box>
    </ViewWrapper>
  );
}
