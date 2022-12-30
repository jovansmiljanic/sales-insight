// Core types
import { FC, useRef } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

// Global types
import { Order } from "@types";

// Vendors
import styled, { css } from "styled-components";
import { Button } from "@components";

interface Orders {
  order: Order;
}

const TableHead = styled.table`
  display: flex;

  td {
    padding: 8px 10px;
  }

  thead {
    tr {
      display: flex;
      flex-direction: column;
    }

    ${({ theme: { colors } }) => css`
      border-bottom: 1px solid ${colors.lighterGray};
    `}

    td {
      &:nth-of-type(odd) {
        background-color: #efefef;
      }

      width: 100%;
      color: #999999;

      ${({ theme: { font } }) => css`
        font-weight: ${font.weight.semiBold};
      `}
    }
  }

  tbody {
    tr {
      display: flex;
      flex-direction: column;
    }
    td {
      &:nth-of-type(odd) {
        background-color: #efefef;
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.lighterGray};
  `}

  td {
    border: none;
    padding: 10px 5px;
  }

  thead {
    tr {
      color: #999999;

      ${({ theme: { font } }) => css`
        font-weight: ${font.weight.semiBold};
      `}
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

const index: FC<Orders> = ({ order }) => {
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
    <Container>
      <Row>
        <Column responsivity={{ md: 12 }}>
          <PDFExport>
            <div ref={contentArea}>
              <TableHead>
                <thead>
                  <tr>
                    <td>Naziv kupca</td>
                    <td>Adresa</td>
                    <td>Komercijalista</td>
                    <td>Valuta</td>
                    <td>Datum</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.customer.name}</td>
                    <td>{order.address}</td>
                    <td>{order.owner}</td>
                    <td>{order.valuta}</td>
                    <td>
                      {day} / {month + 1} / {year}
                    </td>
                  </tr>
                </tbody>
              </TableHead>

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
        </Column>
      </Row>
    </Container>
  );
};

export { index as Order };
