// Core types
import { FC } from "react";

// Vendors
import { Grid } from "@components";
import { Session } from "next-auth";

interface Orders {
  session: Session;
}

const index: FC<Orders> = ({ session }) => {
  return (
    <Grid
      $apiPath="orders"
      $title="Moja trebovanja"
      $myOrders={true}
      $session={session}
    />
  );
};

export { index as MyOrders };
