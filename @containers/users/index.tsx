// Core types
import { FC } from "react";

import { Grid } from "@components";

const index: FC = () => {
  return <Grid $apiPath="users" $title="Svi komercijalisti" $users={true} />;
};

export { index as Users };
