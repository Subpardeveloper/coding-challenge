import React, { FC, useReducer, createContext } from "react";

export enum Grouping {
  LOCATION = "location",
  ASSET_CLASS = "class",
}

type Action = { type: "groupBy"; payload?: any };
type Dispatch = (action: Action) => void;
type State = { groupBy: Grouping };
type CountProviderProps = { children: React.ReactNode };

const initialState = {
  groupBy: Grouping.LOCATION,
};

function settingsReducer(state: State, action: Action) {
  switch (action.type) {
    case "groupBy": {
      return { groupBy: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const SettingsContext = createContext<[State, Dispatch]>([
  initialState,
  () => {},
]);

const SettingsContextProvider: FC<CountProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
