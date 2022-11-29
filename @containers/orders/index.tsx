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
import { Heading } from "@components";

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
          <Heading
            as="h2"
            weight="semiBold"
            padding={{ md: { top: 3, bottom: 3 }, sm: { top: 5, bottom: 6 } }}
          >
            Pogledaj sva trebovanja
          </Heading>

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
