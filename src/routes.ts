import LoginPage from "./pages/login/Login";
import StockPage from "./pages/stock/Stock";
import StockList from "./pages/stockList/StockList";
import StockWidgetPage from "./pages/StockWidget";
const routes = [
  {
    key: 1,
    path: "/stock/:stockName",
    component: StockPage,
    exact: true,
  },
  {
    key: 2,
    path: "/strategy/:strategyName/list",
    component: StockList,
    exact: true,
  },
  {
    key: 3,
    path: "/stock/:stockName/fullScreenView",
    component: StockWidgetPage,
    exact: true,
  },
];

export default routes;
