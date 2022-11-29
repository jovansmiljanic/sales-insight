// Core types
import { FC, useRef, useState } from "react";

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
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.lightGray};
  `}
`;

const Wrap = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    align-items: flex-end;
    padding-right: 20px;
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

  const [showMore, setShowMore] = useState(false);

  const handleExportPdf = (e: any) => {
    if (contentArea?.current) {
      savePDF(contentArea.current, { paperSize: "A4" });
    }
  };
  return (
    <>
      <PDFExport>
        <div ref={contentArea}>
          <Head onClick={() => setShowMore(!showMore)}>
            <Wrapper>
              <Wrap>
                <Heading
                  as="h6"
                  padding={{ md: { right: 1 }, sm: { right: 1 } }}
                >
                  Adresa:
                </Heading>
                <Heading as="h6" weight="bold">
                  {order.address}
                </Heading>
              </Wrap>

              <Wrap>
                <Heading
                  as="h6"
                  padding={{ md: { right: 1 }, sm: { right: 1 } }}
                >
                  Prodavac:
                </Heading>
                <Heading as="h6" weight="bold">
                  {order.owner}
                </Heading>
              </Wrap>

              <Wrap>
                <Heading
                  as="h6"
                  padding={{ md: { right: 1 }, sm: { right: 1 } }}
                >
                  Kupac:
                </Heading>
                <Heading as="h6" weight="bold">
                  {order.customer.name}
                </Heading>
              </Wrap>
            </Wrapper>

            <Wrapper>
              <Wrap>
                <Heading
                  as="h6"
                  padding={{ md: { right: 1 }, sm: { right: 1 } }}
                >
                  Valuta:
                </Heading>
                <Heading as="h6" weight="bold">
                  {order.valuta}
                </Heading>
              </Wrap>

              <Wrap>
                <Heading
                  as="h6"
                  padding={{ md: { right: 1 }, sm: { right: 1 } }}
                >
                  Datum:
                </Heading>
                <Heading as="h6" weight="bold">
                  {day} / {month + 1} / {year}
                </Heading>
              </Wrap>
            </Wrapper>
          </Head>

          {showMore && (
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
          )}
        </div>
      </PDFExport>

      {showMore && (
        <Button
          variant="primary"
          onClick={handleExportPdf}
          margin={{ md: { top: 1 }, sm: { top: 1 } }}
        >
          Preumzmi
        </Button>
      )}
    </>
  );
};

export { index as Table };
