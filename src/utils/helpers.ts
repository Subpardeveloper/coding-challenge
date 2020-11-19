import { stringify } from "querystring";
import { Asset, PortfolioDetails } from "../types";

export const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const formatPercentage = (value: number): string => {
  const percentage = value * 100;
  return percentage.toFixed(2) + "%";
};

export const calculateTotalWealth = (portfolio: PortfolioDetails) => {
  const investmentValue = portfolio.assets.reduce(
    (prevValue: number, asset: Asset) =>
      prevValue + parseFloat(asset.total_value_in_ref_ccy.toFixed(2)),
    0
  );

  return formatCurrency(investmentValue);
};

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
