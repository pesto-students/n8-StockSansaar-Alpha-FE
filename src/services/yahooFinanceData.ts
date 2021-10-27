import axios, { AxiosRequestConfig } from "axios";

const YAHOO_FINANCE_BASE_URL = "https://yfapi.net";
const getEndpointUrl = (name: YahooFinanceEndpointNames) => {
  switch (name) {
    case YahooFinanceEndpointNames.QUOTE_SUMMARY:
      return "/v11/finance/quoteSummary";
    case YahooFinanceEndpointNames.RECOMMENDATIONS_BY_SYMBOL:
      return "/v6/finance/recommendationsbysymbol";
    case YahooFinanceEndpointNames.MOST_WATCHLISTED:
      return "/ws/screeners/v1/finance/screener/predefined/saved";
    case YahooFinanceEndpointNames.MARKET_SUMMARY:
      return "/v6/finance/quote/marketSummary";
    case YahooFinanceEndpointNames.TRENDING:
      return "/v1/finance/trending/IN";
    default:
      return "";
  }
};

export enum YahooFinanceEndpointNames {
  QUOTE_SUMMARY = "quoteSummary",
  RECOMMENDATIONS_BY_SYMBOL = "recommendationsBySymbol",
  MOST_WATCHLISTED = "mostWatchlisted",
  MARKET_SUMMARY = "marketSummary",
  TRENDING = "trending",
  GET_MOVERS = "getMovers",
}

const queryYahooFinance = (
  endpointName: YahooFinanceEndpointNames,
  params: any = {}
) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${YAHOO_FINANCE_BASE_URL}${getEndpointUrl(endpointName)}`,
    params,
    headers: {
      "x-api-key": process.env.YAHOO_FINANCE_API_KEY || "",
    },
  };
  return axios.request(options);
};

export default queryYahooFinance;
