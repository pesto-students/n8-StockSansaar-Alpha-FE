import LoginPage from "./pages/login/Login";
import StockPage from "./pages/login/stock/Stock";
import StockList from "./pages/login/stockList/stockList/StockList";
const routes = [
    {
        key: 0,
        path: '/',
        component: LoginPage,
        exact: true,
    },
    {
        key: 1,
        path: '/stock/:name',
        component: StockPage,
        exact: true,
    },
    {
        key: 2,
        path: '/strategy/:name/list',
        component: StockList,
        exact: true,
    },
    {
        key: 3,
        path: '/strategy/:name/list/:name',
        component: StockPage,
        exact: true,
    },
]

export default routes;