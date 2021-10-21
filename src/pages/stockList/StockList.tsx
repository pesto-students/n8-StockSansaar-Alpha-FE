import { Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import ViewWrapper from "../../components/wrappers/ViewWrapper";

const columns = [
  { field: "symbol", headerName: "Symbol", width: 200 },
  { field: "companyName", headerName: "Company Name", width: 400 },
  { field: "industry", headerName: "Industry", width: 300 },
];
export default function StockList() {
  const [stockListData, setStockListData] = React.useState<Array<any>>([]);
  const { strategyName }: any = useParams();
  React.useEffect(() => {
    if (!stockListData.length) {
      axios
        .get(`http://localhost:7000/strategy/get-stocks/${strategyName}`)
        .then((res) => {
          const stockList = res.data || [];
          console.log(stockList);
          setStockListData(stockList);
        });
    }
  });

  const history = useHistory();
  return (
    <ViewWrapper
      header={
        <div className={clsx("flex")}>
          <Typography variant="h3">{} Strategies</Typography>
        </div>
      }
    >
      <DataGrid
        rows={stockListData}
        getRowId={(row: any) => row.symbol}
        onRowClick={(row: any) => history.push(`/stock/${row.row.symbol}`)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </ViewWrapper>
  );
}
