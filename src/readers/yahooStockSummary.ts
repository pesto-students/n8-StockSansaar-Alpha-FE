import _property from "lodash/property";

const fiftyTwoWeekLow = _property("fiftyTwoWeekLow.fmt");
const fiftyTwoWeekHigh = _property("fiftyTwoWeekHigh.fmt");
const priceToSalesTrailing12Months = _property(
  "priceToSalesTrailing12Months.fmt"
);
const fiftyDayAverage = _property("fiftyDayAverage.fmt");
const twoHundredDayAverage = _property("twoHundredDayAverage.fmt");
const open = _property("open.fmt");
const dayLow = _property("dayLow.fmt");
const dayHigh = _property("dayHigh.fmt");
const previousClose = _property("previousClose.fmt");
const averageVolume = _property("averageVolume.fmt");
const averageVolume10days = _property("averageVolume10days.fmt");
const averageDailyVolume10Day = _property("averageDailyVolume10Day.fmt");

const list = {
  technicals: {
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh,
    priceToSalesTrailing12Months,
    fiftyDayAverage,
    twoHundredDayAverage,
  },
  price: {
    open,
    dayLow,
    dayHigh,
    previousClose,
    averageVolume,
    averageVolume10days,
    averageDailyVolume10Day,
  },
};

export default list;
