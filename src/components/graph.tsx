import React, { useContext } from "react";
import {
  BarChart,
  BarSeries,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
} from "reaviz";
import useSWR from "swr";
import { Asset } from "../types";
import { useParams } from "react-router-dom";
import { fetcher } from "../utils/fetcher";
import { groupBy, prop, sum } from "ramda";
import { SettingsContext, Grouping } from "../utils/context";
import styled from "styled-components";
import { capitalize } from "../utils/helpers";

const Wrapper = styled.div`
  display: flex;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #495057;
`;

const colors = [
  "#004d80",
  "#006296",
  "#0077ab",
  "#008dbe",
  "#00a3cf",
  "#00bade",
  "#00d1eb",
  "#00e8f6",
  "#00ffff",
];

const useGroupBy = (assets: Asset[]) => {
  const [state] = useContext(SettingsContext);

  const key =
    state.groupBy === Grouping.LOCATION ? "geographical_region" : "asset_class";

  const grouped = groupBy(prop(key), assets);

  const values = Object.keys(grouped).reduce<{ key: string; data: number }[]>(
    (acc, key: string) => {
      return [
        ...acc,
        {
          key: key,
          data: sum(
            grouped[key].map((asset: Asset) => asset.total_value_in_ref_ccy)
          ),
        },
      ];
    },
    []
  );

  return values;
};

const Graph = () => {
  const { id } = useParams<{ id: string }>();
  const { data: portfolio } = useSWR(["/api/portfolio", id], fetcher);

  const assets: Asset[] = portfolio?.assets;

  const chartData = useGroupBy(assets);

  const [state] = useContext(SettingsContext);

  return (
    <Wrapper>
      <BarChart
        width={900}
        height={400}
        data={chartData}
        xAxis={<LinearXAxis type="value" />}
        yAxis={
          <LinearYAxis
            type="category"
            tickSeries={<LinearYAxisTickSeries tickSize={20} />}
          />
        }
        series={<BarSeries layout="horizontal" colorScheme={colors} />}
      />
      <DetailsDiv>
        <span>Asset distribution: {capitalize(state.groupBy)}</span>
        <span>Investor profile: {portfolio.investor_profile}</span>
        <span>Total assets: {portfolio.assets.length}</span>
      </DetailsDiv>
    </Wrapper>
  );
};

export default Graph;
