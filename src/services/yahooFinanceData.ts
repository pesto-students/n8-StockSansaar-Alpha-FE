import axios, { AxiosRequestConfig } from "axios";

const YAHOO_FINANCE_BASE_URL = "https://yfapi.net";

export enum YahooFinanceEndpointNames {
  QUOTE_SUMMARY = "quoteSummary",
  RECOMMENDATIONS_BY_SYMBOL = "recommendationsBySymbol",
  MOST_WATCHLISTED = "mostWatchlisted",
  MARKET_SUMMARY = "marketSummary",
  TRENDING = "trending",
  SEARCH = "search",
  GET_MOVERS = "getMovers",
  QUOTE = "quote",
}

const getEndpointUrl = (name: YahooFinanceEndpointNames) => {
  switch (name) {
    case YahooFinanceEndpointNames.QUOTE_SUMMARY:
      return "/v11/finance/quoteSummary";
    case YahooFinanceEndpointNames.QUOTE:
      return "/v6/finance/quote";
    case YahooFinanceEndpointNames.RECOMMENDATIONS_BY_SYMBOL:
      return "/v6/finance/recommendationsbysymbol";
    case YahooFinanceEndpointNames.MOST_WATCHLISTED:
      return "/ws/screeners/v1/finance/screener/predefined/saved";
    case YahooFinanceEndpointNames.MARKET_SUMMARY:
      return "/v6/finance/quote/marketSummary";
    case YahooFinanceEndpointNames.TRENDING:
      return "/v1/finance/trending/IN";
    case YahooFinanceEndpointNames.SEARCH:
      return "/v6/finance/autocomplete";
    default:
      return "";
  }
};

const queryYahooFinance = (
  endpointName: YahooFinanceEndpointNames,
  params: any = {},
  trailingUrl?: String
) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${YAHOO_FINANCE_BASE_URL}${getEndpointUrl(endpointName)}${
      trailingUrl ? `/${trailingUrl}` : ""
    }`,
    params,
    paramsSerializer: function (params: any) {
      let finalString = "";
      for (const key in params)
        finalString = finalString + `&${key + "=" + params[key]}`;
      return finalString;
    },
    headers: {
      "x-api-key": process.env.REACT_APP_YAHOO_FINANCE_API_KEY2 || "",
    },
  };
  return axios.request(options);
};

export default queryYahooFinance;
