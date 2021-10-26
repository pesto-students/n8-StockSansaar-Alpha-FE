import { Typography } from "@material-ui/core";
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
export default function StockList() {
  const {
    state: { strategyData: strategy },
  }: any = useLocation();
  const [stockListData, setStockListData] = React.useState<Array<any>>([]);
  const { strategyName }: any = useParams();
  React.useEffect(() => {
    if (!stockListData.length) {
      axios
        .get(`http://localhost:7000/strategy/get-stocks/${strategyName}`)
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
      <Typography variant="body2" gutterBottom>
        {strategy.description}
      </Typography>
      <DataGrid
        rows={stockListData}
        getRowId={(row: any) => row.symbol}
        onRowClick={(row: any) =>
          history.push(`${strategyName}/stock/${row.row.symbol}`)
        }
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </ViewWrapper>
  );
}
