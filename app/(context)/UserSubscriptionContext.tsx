import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const UserSubscriptionContext = createContext<any>(null);

export interface UserSubscriptionContextInterface {
  userSubscription: boolean;
  setUserSubscription: Dispatch<SetStateAction<boolean>>;
}

type UserSubscriptionProviderProps = {
  children: ReactNode;
};

export const UserSubscriptionContextProvider = ({
  children,
}: UserSubscriptionProviderProps) => {
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  return (
    <UserSubscriptionContext.Provider
      value={{ userSubscription, setUserSubscription }}
    >
      {children}
    </UserSubscriptionContext.Provider>
  );
};
