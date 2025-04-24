import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const UpdateCreditUsageContext = createContext<any>(null);

export interface UpdateCreditUsageContextInterface {
  totalUsage: any;
  setTotalUsage: Dispatch<SetStateAction<any>>;
}

type UpdateCreditUsageProviderProps = {
  children: ReactNode;
};

export const UpdateCreditUsageProvider = ({
  children,
}: UpdateCreditUsageProviderProps) => {
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  return (
    <UpdateCreditUsageContext.Provider
      value={{ updateCreditUsage, setUpdateCreditUsage }}
    >
      {children}
    </UpdateCreditUsageContext.Provider>
  );
};
