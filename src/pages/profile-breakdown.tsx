import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../components/table";
import Graph from "../components/graph";
import ActionsMenu from "../components/actions-menu";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { calculateTotalWealth } from "../utils/helpers";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background-image: url("../page-bkgrd.png");
`;

const TableWrapper = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #cfcfcf;
`;

const HeadersGrid = styled.div`
  display: grid;
  min-height: 82px;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #495057;
  padding: 0rem 1rem 1rem 1rem;
`;

const HeadersTitleLeft = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
`;

const HeadersTitleRight = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: right;
`;

const HeadersValueLeft = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-top: -10px;
`;

const HeadersValueRight = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: right;
  margin-top: -10px;
`;

const ChartWrapper = styled.div`
  width: auto;
  height: auto;
  min-height: 28rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #cfcfcf;
`;

const ProgressDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  min-height: 28rem;
`;

const ProfileBreakdown: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: portfolio, error } = useSWR(["/api/portfolio", id], fetcher, {
    errorRetryInterval: 0,
  });

  const investmentValue = portfolio ? calculateTotalWealth(portfolio) : 0;

  return (
    <Wrapper data-testid="test-id-profile-breakdown">
      <HeadersGrid>
        <HeadersTitleLeft>Client Name</HeadersTitleLeft>
        <HeadersTitleRight>Total Wealth</HeadersTitleRight>
        <HeadersValueLeft>{portfolio?.client_name || ""}</HeadersValueLeft>
        <HeadersValueRight>{investmentValue || ""}</HeadersValueRight>
      </HeadersGrid>

      <ActionsMenu />

      <ChartWrapper>
        {!error && !portfolio && (
          <ProgressDiv>
            <ProgressSpinner />
          </ProgressDiv>
        )}

        {!error && portfolio && <Graph />}
      </ChartWrapper>

      <TableWrapper>
        {!error && !portfolio && (
          <ProgressDiv>
            <ProgressBar mode="indeterminate" style={{ height: "4px" }} />
          </ProgressDiv>
        )}

        {!error && portfolio && <Table assets={portfolio?.assets || []} />}
      </TableWrapper>
    </Wrapper>
  );
};

export default ProfileBreakdown;
