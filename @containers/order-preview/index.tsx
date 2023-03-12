// Core types
import { FC } from "react";

// Global components
import { Heading } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global types
import { Order } from "@types";

// Vendors
import styled, { css } from "styled-components";

interface Orders {
  order: Order;
}

const Wrapper = styled.div`
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);

  ${({ theme: { colors } }) => css`
    color: ${colors.iconColor};
    background-color: ${colors.white};
  `}
`;

const CompanyDetails = styled.div`
  display: flex;
  padding-bottom: 20px;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const CustomerDetails = styled.div`
  display: flex;
  padding: 20px 0;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Col1 = styled.div`
  flex: 0 0 80%;
`;

const Col2 = styled.div``;

const ItemsDetails = styled.div``;

const Table = styled.table`
  width: 100%;
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.semiBold};
    border-bottom: 1px solid ${colors.lightGray};
  `}

  td {
    padding: 5px 10px;

    &:nth-child(1) {
      width: 40%;
    }

    &:nth-child(2) {
      width: 20%;
    }

    &:nth-child(3) {
      width: 20%;
    }

    &:nth-child(3) {
      width: 20%;
    }
  }
`;

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    td {
      border-bottom: 1px solid ${colors.lightGray};

      padding: 10px;

      &:nth-child(1) {
        width: 40%;
      }

      &:nth-child(2) {
        width: 20%;
      }

      &:nth-child(3) {
        width: 20%;
      }

      &:nth-child(3) {
        width: 20%;
      }
    }
  `}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px 0;
  padding-top: 40px;
`;

const FooterItem = styled.div`
  display: flex;
  width: 290px;

  h6 {
    flex: 0 0 39%;
  }

  span {
    flex: 0 0 30%;
  }
`;

const index: FC<Orders> = ({ order }) => {
  // Get and format date from createAt prop
  const orderDate = new Date(order.createdAt);
  const day = orderDate.getDate();
  const month = orderDate.getMonth();
  const year = orderDate.getFullYear();

  const total = order.articles
    .map((article) => +article.price * +article.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const tax = 70;

  return (
    <Container>
      <Row
        padding={{ md: { top: 10, bottom: 10 } }}
        justifyContent={{ md: "center" }}
      >
        <Column responsivity={{ md: 9 }}>
          <Wrapper>
            <CompanyDetails>
              <Col1>
                <Heading
                  as="h5"
                  weight="semiBold"
                  padding={{ md: { bottom: 1 } }}
                >
                  GRADAC TRADE
                </Heading>
                <Heading as="p">Vukašina Ignjatovića 14/2</Heading>
                <Heading as="p">+1 (123) 456 7891</Heading>
              </Col1>

              <Col2>
                <Heading
                  as="h5"
                  weight="semiBold"
                  padding={{ md: { bottom: 1 } }}
                >
                  Racun: #321
                </Heading>
                <Heading as="p">
                  Datum izadaje: {day}.{month + 1}.{year}.
                </Heading>
              </Col2>
            </CompanyDetails>

            <CustomerDetails>
              <Col1>
                <Heading
                  as="h5"
                  weight="semiBold"
                  padding={{ md: { bottom: 1 } }}
                >
                  Invoice To:
                </Heading>

                <Heading as="p">{order.customer.name}</Heading>
                <Heading as="p">{order.address}</Heading>
                <Heading as="p">{order.customer.pib}</Heading>
              </Col1>

              <Col2>
                <Heading
                  as="h5"
                  weight="semiBold"
                  padding={{ md: { bottom: 1 } }}
                >
                  Bill To:
                </Heading>

                <Heading as="p">Total Due: {total}</Heading>
              </Col2>
            </CustomerDetails>

            <ItemsDetails>
              <Table>
                <Thead>
                  <tr>
                    <td>Name</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Total</td>
                  </tr>
                </Thead>

                <Tbody>
                  {order.articles.map((article, i) => (
                    <tr key={i}>
                      <td>{article.name}</td>
                      <td>{article.quantity}</td>
                      <td>{article.price} din</td>
                      <td>{+article.price * +article.quantity} din</td>
                    </tr>
                  ))}
                </Tbody>
              </Table>

              <Footer>
                <FooterItem>
                  <Heading as="h6">Subtotal:</Heading>
                  <span>{total} din</span>
                </FooterItem>

                <FooterItem>
                  <Heading as="h6">Discount:</Heading>
                  <span>0,00 din</span>
                </FooterItem>

                <FooterItem>
                  <Heading as="h6">Tax:</Heading>
                  <span>{tax} din</span>
                </FooterItem>

                <FooterItem>
                  <Heading as="h6">Total:</Heading>
                  <span>{total + tax} din</span>
                </FooterItem>
              </Footer>
            </ItemsDetails>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export { index as OrderPreview };
