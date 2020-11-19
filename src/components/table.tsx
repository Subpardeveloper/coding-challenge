import React, { FC, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency, formatPercentage } from "../utils/helpers";
import { Asset } from "../types";
import "./table.css";
import styled from "styled-components";

const headerRenderer = (rowData: Asset) => {
  return (
    <React.Fragment>
      <span>{rowData.asset_class}</span>
    </React.Fragment>
  );
};

const priceRenderer = (rowData: Asset) => {
  return formatCurrency(rowData.total_value_in_ref_ccy);
};

const weightRenderer = (rowData: Asset) => {
  return formatPercentage(rowData.weight);
};

const MetaKey = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #495057;
  padding-bottom: 1rem;
`;

const Table: FC<{ assets: Asset[] }> = ({ assets }) => {
  let multiSortMeta = [
    { field: "asset_class", order: 1 },
    { field: "total_value_in_ref_ccy", order: 1 },
  ];

  return (
    <>
      <MetaKey>
        Hold CTRL and select desired columns to sort by multiple values
      </MetaKey>
      <DataTable
        value={assets}
        // removableSort
        rowGroupMode="subheader"
        rowGroupHeaderTemplate={headerRenderer}
        rowGroupFooterTemplate={() => null}
        groupField="asset_class"
        sortField="total_value_in_ref_ccy"
        sortMode="multiple"
        multiSortMeta={multiSortMeta}
        sortOrder={1}
        onValueChange={(sortedData) => console.log(sortedData)}
      >
        <Column
          field="asset_class"
          header="Asset Class"
          sortable
          body={() => null}
        ></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column
          field="geographical_region"
          header="Geographical Region"
          sortable
        ></Column>
        <Column
          field="total_value_in_ref_ccy"
          header="Total Value"
          sortable
          body={priceRenderer}
        ></Column>
        <Column
          field="weight"
          header="Weight"
          sortable
          body={weightRenderer}
        ></Column>
      </DataTable>
    </>
  );
};

export default Table;
