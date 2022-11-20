// Core types
import type { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Local components
import { AddUser } from "./AddUser";
import { AllUsers } from "./AllUsers";

// GLobal types
import { User } from "@types";

interface Users {
  users: User[];
}

const index: FC<Users> = ({ users }) => {
  return (
    <Container>
      <Row padding={{ md: { top: 6 }, sm: { top: 6 } }}>
        <Column responsivity={{ md: 6 }}>
          <AddUser />
        </Column>

        <Column responsivity={{ md: 6 }}>
          <AllUsers users={users} />
        </Column>
      </Row>
    </Container>
  );
};

export { index as Users };
