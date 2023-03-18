// Core types
import { FC } from "react";

import { Grid } from "@components";

const index: FC = () => {
  return <Grid $apiPath="customers" $title="Svi kupci" $users={true} />;
};

export { index as Customers };
