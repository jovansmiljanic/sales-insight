// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

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
      &:nth-child(1) {
        width: 10%;
      }

      &:nth-child(2) {
        width: 70%;
      }

      &:nth-child(3) {
        width: 20%;
      }
    }
  }
`;

interface Item {
  item: any;
  num: any;
}

const index: FC<Item> = ({ item, num }) => {
  return (
    <TableHead>
      <tbody>
        <tr>
          <td>#{num + 1}</td>
          <td>{item.name}</td>
          <td>{item.pib}</td>
        </tr>
      </tbody>
    </TableHead>
  );
};

export { index as Item };
