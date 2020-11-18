import { rest } from "msw";
import { Portfolio, Asset } from "../types";

import data from "../utils/mock.json";
// console.log("Backend data:", data);

type Users = {
  [key: string]: { client_name: string };
};

const BaseUrl = process.env.NODE_ENV === "test" ? "http://localhost:3000" : "";
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);

export const handlers = [
  rest.get(`${BaseUrl}/api/portfolio/:userId`, (req, res, ctx) => {
    const { userId } = req.params;

    const portfolios: Portfolio = data;

    const portfolio = Object.values(portfolios).find(
      (user) => user.username === userId
    );

    if (portfolio) {
      const assets: Asset[] = portfolio.assets.map((asset) => {
        const { amount, logo, ...rest } = asset;

        return rest;
      });

      const cleaned = { ...portfolio, assets };

      return res(ctx.status(200), ctx.json(cleaned));
    }

    return res(ctx.status(404));
  }),

  rest.get(`/api/users`, (req, res, ctx) => {
    const portfolios: Portfolio = data;

    const users = Object.keys(portfolios).reduce<Users>((acc, key: string) => {
      return { ...acc, [key]: { client_name: portfolios[key].client_name } };
    }, {});

    return res(ctx.status(200), ctx.json(users));
  }),
];
