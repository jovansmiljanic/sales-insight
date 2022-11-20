// Core types
import { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// GLobal components
import { Table } from "./Table";

// Global types
import { Order } from "@types";

// Vendors
import styled from "styled-components";

const Wrap = styled.div`
  margin-bottom: 30px;
`;

interface Orders {
  orders: Order[];
}

const index: FC<Orders> = ({ orders }) => {
  return (
    <Container>
      <Row padding={{ md: { top: 4 } }}>
        <Column responsivity={{ md: 12 }}>
          {Array.isArray(orders) &&
            orders.map((order, i) => (
              <Wrap key={i}>
                <Table order={order} />
              </Wrap>
            ))}
        </Column>
      </Row>
    </Container>
  );
};

export { index as Orders };
