"use client";
import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const TotalUsageContext = createContext<any>(0);

export interface TotalUsageContextInterface {
  totalUsage: Number;
  setTotalUsage: Dispatch<SetStateAction<Number>>;
}

type TotalUsageProviderProps = {
  children: ReactNode;
};

export const TotalUsageContextProvider = ({
  children,
}: TotalUsageProviderProps) => {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
};
