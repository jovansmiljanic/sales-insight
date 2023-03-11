// Core types
import { Fragment, useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Grid store
import { GridContext } from "..";

// Local component
import { Item } from "./Item";
import { Placeholder } from "./Placeholder";

const TableWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;

  ${({ theme: { breakpoints, colors } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      justify-content: center;
    }
  `}
`;

const NotFound = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableHead = styled.table`
  width: 100%;

  td {
    padding: 8px 10px;
  }

  thead {
    cursor: pointer;

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

const index: FC = () => {
  // Grid context
  const { length, updatedItems, isLoading } = useContext(GridContext);

  return (
    <TableWrapper>
      {!updatedItems && (
        <>
          {/* <Placeholder />
          <Placeholder />
          <Placeholder /> */}
        </>
      )}

      {length === 0 && (
        <NotFound>Sorry, we didn't find any customers...</NotFound>
      )}

      <TableHead>
        <thead>
          <tr>
            <td>Broj</td>
            <td>Ime</td>
            <td>PIB</td>
          </tr>
        </thead>
      </TableHead>

      {Array.isArray(updatedItems) &&
        updatedItems.map((item, i) => (
          <Fragment key={i}>
            {isLoading ? (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            ) : (
              <Item key={item.title} num={i} {...{ item }} />
            )}
          </Fragment>
        ))}
    </TableWrapper>
  );
};

export { index as Table };
