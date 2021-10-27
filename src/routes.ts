import StockPage from "./pages/stock/Stock";
import StockList from "./pages/stockList/StockList";
import StockScreener from "./pages/StockScreener";
import StockWidgetPage from "./pages/StockWidget";
import Strategies from "./pages/Strategies";
import VirtualPortfolio from "./pages/virtualPortfolio/VirtualPortfolio";
const routes = [
  {
    key: 0,
    path: "/screener",
    component: StockScreener,
    exact: true,
  },
  {
    key: 1,
    path: "/strategies/:strategyName/stock/:stockName",
    component: StockPage,
    exact: true,
  },
  {
    key: 2,
    path: "/strategies/:strategyName",
    component: StockList,
    exact: true,
  },
  {
    key: 3,
    path: "/strategies/:strategyName/stock/:stockName/detail",
    component: StockWidgetPage,
    exact: true,
  },
  {
    key: 4,
    path: "/virtual-portfolio",
    component: VirtualPortfolio,
    exact: true,
  },
  {
    key: 5,
    path: "/strategies",
    component: Strategies,
    exact: true,
  },
];

export default routes;
