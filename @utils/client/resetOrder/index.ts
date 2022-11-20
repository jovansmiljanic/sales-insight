// Core
import { useContext } from "react";

// Global context
import { StoreContext } from "@context";

export const resetOrder = () => {
  const {
    setCustomer,
    setArticles,
    setAddress,
    setValuta,
    isActive,
    setIsActive,
    setCustomerName,
  } = useContext(StoreContext);

  setCustomer("");
  setArticles("");
  setAddress("");
  setValuta("");
  setCustomerName("");
  setIsActive(!isActive);
};
