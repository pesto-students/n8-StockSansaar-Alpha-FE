import { Button, Popover, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ArticleIcon from "@material-ui/icons/Description";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  AdvancedRealTimeChart,
  CompanyProfile,
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem",
  },
  grid: {
    display: "grid",
    height: "50vh",
    overflowY: "scroll",
    gridTemplateColumns: "repeat(auto-fill, 15rem)",
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
  const history = useHistory();
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

  return (
    <ViewWrapper
      header={
        <div className={classes.header}>
          <div className="flex">
            <Typography variant="h3">{symbol}</Typography>
            <ArticleIcon onClick={handleClick} />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`${symbol}/detail`)}
            >
              Detailed Analytics
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
            width: "55%",
          }}
        >
          <div className="widget">
            <AdvancedRealTimeChart
              theme={theme.palette.type}
              symbol={`BSE:${symbol}`}
              height={500}
              width={500}
            />
          </div>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "45%",
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
            <div className={classes.grid}>
              {Object.entries(stockSummaryReader.price).map(([k, v]) => {
                const value = v(stockSummary);
                // @ts-ignore
                return <StockStatistic keys={k} value={value} />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={classes.grid}>
              {Object.entries(stockStatsReader.fundamentals).map(([k, v]) => {
                const value = v(keyStatistics);
                // @ts-ignore
                return <StockStatistic keys={k} value={value} />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className={classes.grid}>
              {Object.entries(stockSummaryReader.technicals).map(([k, v]) => {
                const value = v(stockSummary);
                // @ts-ignore
                return <StockStatistic keys={k} value={value} />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className={classes.grid}>
              {Object.entries(stockStatsReader.others).map(([k, v]) => {
                const value = v(keyStatistics);
                // @ts-ignore
                return <StockStatistic keys={k} value={value} />;
              })}
            </div>
          </TabPanel>
        </Box>
      </Box>
    </ViewWrapper>
  );
}
