// Core types
import type { FC } from "react";

// GLobal components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { Order } from "@types";

const Table = styled.table`
  width: 100%;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.lightGray};
  `}

  td {
    border: none;
    padding: 10px 5px;
  }

  thead {
    tr {
      background-color: #c2c2c2;
    }
  }

  tbody {
    tr {
      :nth-of-type(odd) {
        background-color: #efefef;
      }

      :hover {
        background-color: lightpink;
      }
    }
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.lightGray};
    border-bottom: 0;
  `}
`;

const Wrap = styled.div`
  display: flex;

  &:not(:last-child) {
    padding-right: 50px;
  }
`;

interface Result {
  order: Order;
}

const index: FC<Result> = ({ order }) => {
  // Get and format date from createAt prop
  const orderDate = new Date(order.createdAt);
  const day = orderDate.getDate();
  const month = orderDate.getMonth();
  const year = orderDate.getFullYear();

  return (
    <>
      <Head>
        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Prodavac:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {order.owner}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Kupac:
          </Heading>

          <Heading as="h6" weight="semiBold">
            {order.customer.name}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Valuta:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {order.valuta}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Adresa:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {order.address}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Datum:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {day}/{month + 1}/{year}.
          </Heading>
        </Wrap>
      </Head>

      <Table>
        <thead>
          <tr>
            <td>Artikal:</td>
            <td>Kolicina:</td>
            <td>Cena sa pdv:</td>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {order.articles.map((article, i) => (
            <tr key={i}>
              <td>{article.name}</td>
              <td>{article.quantity} kom</td>
              <td>{article.price} din</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as Table };
