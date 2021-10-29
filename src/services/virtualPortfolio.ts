import axios, { AxiosRequestConfig } from "axios";

// const BASE_URL = "https://8ls67k7juh.execute-api.us-west-1.amazonaws.com/dev/";
const BASE_URL = "http://localhost:7000/";

export enum VirtualPortfolioEndpointNames {
  CREATE = "createPortfolio",
  ADD_STOCK = "addStock",
  GET_PORTFOLIO_FOR_USER = "getPortfolioForUser",
  REMOVE_STOCK = "removeStock",
  GET_PORTFOLIO_BY_ID = "getPortfolioById",
}

const getEndpointUrl = (name: VirtualPortfolioEndpointNames) => {
  switch (name) {
    case VirtualPortfolioEndpointNames.CREATE:
      return "virtual_portfolio/create";
    case VirtualPortfolioEndpointNames.ADD_STOCK:
      return "virtual_portfolio/add-stock";
    case VirtualPortfolioEndpointNames.GET_PORTFOLIO_BY_ID:
      return "virtual_portfolio/get-portfolio-by-id";
    case VirtualPortfolioEndpointNames.GET_PORTFOLIO_FOR_USER:
      return "virtual_portfolio/get-portfolio-for-user";
    case VirtualPortfolioEndpointNames.REMOVE_STOCK:
      return "virtual_portfolio/remove-stock";
    default:
      return "";
  }
};

const virtualPortfolioService = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpointName: VirtualPortfolioEndpointNames,
  params: any = {},
  data: any = {}
) => {
  console.log(data);
  const options: AxiosRequestConfig = {
    method,
    url: `${BASE_URL}${getEndpointUrl(endpointName)}`,
    params,
    data,
  };
  return axios.request(options);
};

export default virtualPortfolioService;
