import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import nifty50Data from "../../mockdata/indexData";
import { useHistory } from "react-router-dom";
import ViewWrapper from "../../components/wrappers/ViewWrapper";
import { Tab, Tabs, Typography } from "@mui/material";
import clsx from "clsx";
const columns = [
  { field: "symbol", headerName: "Symbol", width: 150 },
  { field: "ltP", headerName: "Price", width: 150 },
  { field: "per", headerName: "% Change", width: 150 },
  { field: "low", headerName: "Day Low", width: 150 },
  { field: "wkhi", headerName: "Week High", width: 150 },
  { field: "wklo", headerName: "Week Low", width: 150 },
  { field: "yPC", headerName: "1yr Chg", width: 150 },
  { field: "mPC", headerName: "1mo Chg", width: 150 },
];
export default function StockList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const history = useHistory();
  return (
    <ViewWrapper
      header={
        <div className={clsx("flex")}>
          <Typography variant="h3">Strategies</Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </div>
      }
    >
      <DataGrid
        rows={nifty50Data.data}
        getRowId={(row) => row.symbol}
        onRowClick={(row) => history.push(row.row.symbol)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </ViewWrapper>
  );
}
