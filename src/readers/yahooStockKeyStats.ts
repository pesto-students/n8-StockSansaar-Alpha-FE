import _property from "lodash/property";

const enterpriseValue = _property("enterpriseValue.fmt");
const forwardPE = _property("forwardPE.fmt");
const profitMargins = _property("profitMargins.fmt");
const beta = _property("beta.fmt");
const bookValue = _property("bookValue.fmt");
const priceToBook = _property("priceToBook.fmt");
const trailingEps = _property("trailingEps.fmt");
const pegRatio = _property("pegRatio.fmt");
const enterpriseToRevenue = _property("enterpriseToRevenue.fmt");
const enterpriseToEbitda = _property("enterpriseToEbitda.fmt");

const floatShares = _property("floatShares.fmt");
const sharesOutstanding = _property("sharesOutstanding.fmt");
const heldPercentInsiders = _property("heldPercentInsiders.fmt");
const heldPercentInstitutions = _property("heldPercentInstitutions.fmt");

const _52WeekChange = _property("52WeekChange.fmt");

const list = {
  fundamentals: {
    enterpriseValue,
    forwardPE,
    profitMargins,
    beta,
    bookValue,
    priceToBook,
    trailingEps,
    pegRatio,
    enterpriseToRevenue,
    enterpriseToEbitda,
  },
  others: {
    floatShares,
    sharesOutstanding,
    heldPercentInsiders,
    heldPercentInstitutions,
  },
  technicals: {
    _52WeekChange,
  },
};
export default list;
