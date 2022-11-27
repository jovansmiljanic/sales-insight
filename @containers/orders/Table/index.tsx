// Core types
import { FC, useRef } from "react";

// GLobal components
import { Button, Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

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

  const contentArea = useRef(null);

  const handleExportPdf = (e: any) => {
    if (contentArea?.current) {
      savePDF(contentArea.current, { paperSize: "A4" });
    }
  };
  return (
    <>
      <PDFExport>
        <div ref={contentArea}>
          <Head>
            <Wrap>
              <Heading as="h6">Prodavac:</Heading>
              <Heading as="h6" weight="bold">
                {order.owner}
              </Heading>
            </Wrap>

            <Wrap>
              <Heading as="h6">Kupac:</Heading>

              <Heading as="h6" weight="bold">
                {order.customer.name}
              </Heading>
            </Wrap>

            <Wrap>
              <Heading as="h6">Valuta:</Heading>
              <Heading as="h6" weight="bold">
                {order.valuta}
              </Heading>
            </Wrap>

            <Wrap>
              <Heading as="h6">Adresa:</Heading>
              <Heading as="h6" weight="bold">
                {order.address}
              </Heading>
            </Wrap>

            <Wrap>
              <Heading as="h6">Datum:</Heading>
              <Heading as="h6" weight="bold">
                {day} / {month + 1} / {year}
              </Heading>
            </Wrap>
          </Head>

          <Table>
            <thead>
              <tr>
                <td>Artikal:</td>
                <td>Kolicina:</td>
                <td>Cena sa pdv:</td>
              </tr>
            </thead>

            <tbody>
              {order.articles.map((article, i) => (
                <tr key={i}>
                  <td>{article.name}</td>
                  <td>{article.quantity} kom</td>
                  <td>{article.price} din</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </PDFExport>

      <Button
        variant="primary"
        onClick={handleExportPdf}
        margin={{ md: { top: 1 }, sm: { top: 1 } }}
      >
        Preumzmi
      </Button>
    </>
  );
};

export { index as Table };
