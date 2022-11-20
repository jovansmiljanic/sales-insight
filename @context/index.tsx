// Core types
import type { FC } from "react";

// Core
import { createContext, useMemo, useEffect, useState } from "react";

// Create Context base
export const StoreContext = createContext({} as AppContext);

// Vendors
import { ThemeProvider } from "styled-components";

// App context properties
import { Theme } from "@context/theme";

// Global types
import { Customer, IArticle } from "@types";

// Instruct component Props Types
interface Props {
  children: React.ReactNode;
}

// Instruct component State Types
interface AppContext {
  isPhone?: boolean;
  isTablet?: boolean;
  articles?: IArticle[];
  setArticles: Function;
  customer: Customer;
  setCustomer: Function;
  address: string;
  setAddress: Function;
  valuta: string;
  setValuta: Function;
  customerName: string;
  setCustomerName: Function;
  result: IArticle[];
  setResult: Function;
  isActive?: boolean;
  setIsActive: (props: boolean) => void;
}

export const Store: FC<Props> = (props) => {
  const [isPhone, setIsPhone] = useState<boolean>();
  const isPhoneMemo = useMemo(() => isPhone, [isPhone]);

  const [isTablet, setIsTablet] = useState<boolean>();
  const isTabletMemo = useMemo(() => isTablet, [isTablet]);

  const [articles, setArticles] = useState<IArticle>();
  const articlesMemo = useMemo(() => articles, [articles]);

  const [customer, setCustomer] = useState<Customer>();
  const customerMemo = useMemo(() => customer, [customer]);

  const [address, setAddress] = useState<string>("");
  const addressMemo = useMemo(() => address, [address]);

  const [valuta, setValuta] = useState<string>("");
  const valutaMemo = useMemo(() => valuta, [valuta]);

  const [result, setResult] = useState<IArticle[]>([]);
  const resultMemo = useMemo(() => result, [result]);

  const [customerName, setCustomerName] = useState<string>("");
  const customerNameMemo = useMemo(() => customerName, [customerName]);

  const [isActive, setIsActive] = useState(false);
  const isActiveMemo = useMemo(() => isActive, [isActive]);

  useEffect(() => {
    // Check if users device is smaller than 768px and enable Phone layout
    const isPhone = window.matchMedia("(max-width: 768px)").matches;

    if (isPhone) setIsPhone(isPhone);

    // Check if users device is smaller than 1192px and enable Tablet layout
    const isTablet = window.matchMedia("(max-width: 1192px)").matches;

    if (isTablet) setIsTablet(isTablet);

    // Listen to window resize and resize layouts
    window.addEventListener("resize", detectLayout);
  }, []);

  // Detect window resize and enable respective layout
  const detectLayout = () => {
    const isPhone = window.matchMedia("(max-width: 768px)").matches;

    // Act accordingly by enabling isPhone layout
    setIsPhone(isPhone);

    const isTablet = window.matchMedia("(max-width: 1192px)").matches;

    // Act accordingly by enabling Tablet layout
    setIsTablet(isTablet);
  };

  return (
    <StoreContext.Provider
      value={
        {
          isPhone: isPhoneMemo,
          isTablet: isTabletMemo,
          articles: articlesMemo,
          setArticles,
          customer: customerMemo,
          setCustomer,
          address: addressMemo,
          setAddress,
          valuta: valutaMemo,
          setValuta,
          customerName: customerNameMemo,
          setCustomerName,
          isActive: isActiveMemo,
          setIsActive,
          result: resultMemo,
          setResult,
        } as AppContext
      }
    >
      <ThemeProvider theme={Theme.light}>{props.children}</ThemeProvider>
    </StoreContext.Provider>
  );
};
