import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://8ls67k7juh.execute-api.us-west-1.amazonaws.com/dev/";
const getEndpointUrl = (name: VirtualPortfolioEndpointNames) => {
  switch (name) {
    case VirtualPortfolioEndpointNames.CREATE:
      return "/virtual_portfolio/create";
    case VirtualPortfolioEndpointNames.ADD_STOCK:
      return "/virtual_portfolio/add-stock";
    case VirtualPortfolioEndpointNames.GET_PORTFOLIO_BY_ID:
      return "/virtual_portfolio/get-portfolio-by-id";
    case VirtualPortfolioEndpointNames.GET_PORTFOLIO_FOR_USER:
      return "/virtual_portfolio/get-portfolio-for-user";
    case VirtualPortfolioEndpointNames.REMOVE_STOCK:
      return "/virtual_portfolio/remove-stock";
    default:
      return "";
  }
};

export enum VirtualPortfolioEndpointNames {
  CREATE = "createPortfolio",
  ADD_STOCK = "addStock",
  GET_PORTFOLIO_FOR_USER = "getPortfolioForUser",
  REMOVE_STOCK = "removeStock",
  GET_PORTFOLIO_BY_ID = "getPortfolioById",
}

const virtualPortfolioService = (
  endpointName: VirtualPortfolioEndpointNames,
  params: any = {},
  token: string
) => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${BASE_URL}${getEndpointUrl(endpointName)}`,
    params,
    headers: {
      token,
    },
  };
  return axios.request(options);
};

export default virtualPortfolioService;
