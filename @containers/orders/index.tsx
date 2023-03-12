// Core types
import { FC } from "react";

// Vendors
import { Grid } from "@components";

const index: FC = () => {
  return <Grid $apiPath="orders" $title="Sva trebovanja" $orders={true} />;
};

export { index as Orders };
