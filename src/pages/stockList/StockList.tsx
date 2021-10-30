import { makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import { useLocation, useParams } from "react-router";
import { useHistory } from "react-router-dom";
import ViewWrapper from "../../components/wrappers/ViewWrapper";

const columns = [
  { field: "symbol", headerName: "Symbol", flex: 0.6 },
  { field: "companyName", headerName: "Company Name", flex: 1 },
  { field: "industry", headerName: "Industry", flex: 0.8 },
];
const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: "2rem",
  },
  paddingBottom: {
    paddingBottom: "2rem",
  },
});
export default function StockList() {
  const classes = useStyles();
  const {
    state: { strategyData: strategy },
  }: any = useLocation();
  const [stockListData, setStockListData] = React.useState<Array<any>>([]);
  const { strategyName }: any = useParams();
  React.useEffect(() => {
    if (!stockListData.length) {
      axios
        .get(
          `https://8ls67k7juh.execute-api.us-west-1.amazonaws.com/dev/strategy/get-stocks/${strategyName}`
        )
        .then((res) => {
          const stockList = res.data || [];
          setStockListData(stockList);
        });
    }
  });

  const history = useHistory();
  return (
    <ViewWrapper
      header={
        <div className={clsx("flex")}>
          <Typography variant="h3">{strategy.name} Strategy</Typography>
        </div>
      }
    >
      <div className={classes.paddingBottom}>
        <Typography variant="body2" className={classes.gutterBottom}>
          {strategy.description}
        </Typography>
        <DataGrid
          className={classes.gutterBottom}
          autoHeight
          rows={stockListData}
          getRowId={(row: any) => row.symbol}
          onRowClick={(row: any) =>
            history.push(`${strategyName}/stock/${row.row.symbol}`)
          }
          classes={{
            cell: "paddingLeft1",
          }}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
    </ViewWrapper>
  );
}
