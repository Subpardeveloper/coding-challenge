import { calculateTotalWealth } from "./helpers";
import { formatPercentage } from "./helpers";
import { formatCurrency } from "./helpers";
import { capitalize } from "./helpers";

describe("Calculate Total Wealth function", () => {
  test("it should calculate total wealth from assets", () => {
    const portfolio = {
      username: "20060036057-40",
      client_name: "Hannah Albers B.Eng.",
      investment_value_in_ref_ccy: 194000,
      assets: [
        {
          valor: 275639,
          weight: 0.90073246955,
          total_value_in_ref_ccy: 174742.099093,
          asset_class: "Liquidity",
          geographical_region: "Other",
          name: "Client Account USD",
          amount: 0.0,
          logo: "tbd.png",
        },
        {
          valor: 24397916,
          weight: 0.09926753044860484,
          total_value_in_ref_ccy: 19257.90090702934,
          asset_class: "Fixed Income",
          geographical_region: "NL",
          name:
            "2.375% NTS Volkswagen Fin Services NV 2014-13.11.18 Series F12/14 - 5 (24397916)",
          amount: 0.0,
          logo: "tbd.png",
        },
      ],
      investor_profile: "Investment Profile A",
    };

    const expectedValue = "$194,000.00";

    expect(calculateTotalWealth(portfolio)).toEqual(expectedValue);
  });
});

describe("Format Number to Percentage function", () => {
  test("It should format number to percentage with 2 decimal point values, convert it to string and add % at the end", () => {
    const value = 1.43374;
    const expectedValue = "143.37%";

    expect(formatPercentage(value)).toEqual(expectedValue);
  });
});

describe("Format Number to Currency function", () => {
  test("It should format number to a string representing currency value in USD", () => {
    const value = 97060.5;
    const expectedValue = "$97,060.50";

    expect(formatCurrency(value)).toEqual(expectedValue);
  });
});

describe("Format String to be Capitalized", () => {
  test("It should capitalize the first letter of a string", () => {
    const value = "jason";
    const expectedValue = "Jason";

    expect(capitalize(value)).toEqual(expectedValue);
  });
});
