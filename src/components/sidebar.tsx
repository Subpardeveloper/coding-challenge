import React, { FC } from "react";
import { PanelMenu } from "primereact/panelmenu";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { sortBy, prop } from "ramda";
import { Portfolio } from "../types";

const Sidebar: FC = () => {
  const history = useHistory();

  const { data: portfolios } = useSWR<Portfolio>("/api/users");

  const portfolioList = portfolios
    ? Object.keys(portfolios).map((key: string) => ({
        label: portfolios[key].client_name,
        icon: "pi pi-fw pi-user",
        command: () => {
          history.push(`/user/${key}`);
        },
      }))
    : [];

  const sortedPortfolioList = portfolioList
    ? sortBy(prop("label"), portfolioList)
    : [];

  const items = [
    {
      label: "Manage Portfolios",
      icon: "pi pi-fw pi-users",
      items: sortedPortfolioList,
    },
    {
      label: "Edit Portfolios",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "New Portfolio",
          icon: "pi pi-fw pi-plus",
        },
        {
          label: "Delete Portfolio",
          icon: "pi pi-fw pi-trash",
        },
        {
          label: "Export Portfolio",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Settings",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Change Currency",
          icon: "pi pi-fw pi-dollar",
        },
        {
          label: "Terms of Use",
          icon: "pi pi-fw pi-info-circle",
        },
        {
          label: "Contact Support",
          icon: "pi pi-fw pi-envelope",
        },
      ],
    },
  ];

  return <PanelMenu model={items} style={{ width: "18rem" }} />;
};

export default Sidebar;
