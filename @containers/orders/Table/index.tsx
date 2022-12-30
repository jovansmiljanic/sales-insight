// Core types
import { FC, useRef, useState } from "react";

// Vendors
import styled, { css } from "styled-components";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

// Global types
import { Order } from "@types";
import { truncateString } from "@utils/client";

const TableHead = styled.table`
  width: 100%;

  td {
    padding: 8px 10px;
  }

  tbody {
    cursor: pointer;

    ${({ theme: { colors } }) => css`
      border: 1px solid ${colors.lighterGray};
    `}

    td {
      width: 20%;

      &:nth-child(1) {
        width: 40%;
      }
    }
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

  const [showMore, setShowMore] = useState(false);

  return (
    <TableHead onClick={() => setShowMore(!showMore)}>
      <tbody>
        <tr>
          <td>{truncateString(order.customer.name)}</td>
          <td>{order.owner}</td>
          <td>{order.valuta}</td>
          <td>
            {day} / {month + 1} / {year}
          </td>
        </tr>
      </tbody>
    </TableHead>
  );
};

export { index as Table };
