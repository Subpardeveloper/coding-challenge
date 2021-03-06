import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { SettingsContext, Grouping } from "../utils/context";

const ActionsMenu = () => {
  const [state, dispatch] = useContext(SettingsContext);

  return (
    <Menubar
      model={[
        {
          label: "Group by Asset Location",
          icon: "pi pi-chart-bar",
          command: () => {
            dispatch({ type: "groupBy", payload: Grouping.LOCATION });
          },
        },
        {
          label: "Group by Asset Class",
          icon: "pi pi-chart-bar",
          command: () => {
            dispatch({ type: "groupBy", payload: Grouping.ASSET_CLASS });
          },
        },
      ]}
    />
  );
};

export default ActionsMenu;
