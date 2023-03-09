// Core types
import { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// GLobal components
import { Table } from "./Table";

// Global types
import { Order } from "@types";

// Vendors
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { Grid } from "@components";

const Wrap = styled.div`
  margin-bottom: 20px;
`;

interface Orders {
  orders: Order[];
}

const TableHead = styled.table`
  width: 100%;

  td {
    padding: 8px 10px;
  }

  thead {
    td {
      width: 20%;
      color: #999999;

      &:nth-child(1) {
        width: 40%;
      }

      ${({ theme: { font } }) => css`
        font-weight: ${font.weight.semiBold};
      `}
    }
  }
`;

const index: FC<Orders> = ({ orders }) => {
  const router = useRouter();

  return (
    <Container>
      <Row>
        <Column responsivity={{ md: 12 }}>
          <TableHead>
            <thead>
              <tr>
                <td>Naziv kupca</td>
                <td>Komercijalista</td>
                <td>Valuta</td>
                <td>Datum</td>
              </tr>
            </thead>
          </TableHead>

          <Grid $apiPath="orders" />
          {/* {Array.isArray(orders) &&
            orders.map((order, i) => (
              <Wrap key={i} onClick={() => router.push(`/orders/${order._id}`)}>
                <Table order={order} />
              </Wrap>
            ))} */}
        </Column>
      </Row>
    </Container>
  );
};

export { index as Orders };
