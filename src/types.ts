export type Asset = {
  geographical_region: string;
  asset_class: string;
  name: string;
  total_value_in_ref_ccy: number;
  valor: number;
  weight: number;
  amount?: number;
  logo?: string;
};

export type PortfolioDetails = {
  username: string;
  client_name: string;
  investment_value_in_ref_ccy: number;
  assets: Asset[];
  investor_profile: string;
};

export type Portfolio = {
  [key: string]: PortfolioDetails;
};
