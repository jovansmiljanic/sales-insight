// Core
import { useContext, type FC } from "react";

// Global components
import { Button, Icon } from "@components";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";

// Grid store
import { GridContext } from "..";

// Local component
import { Placeholder } from "../Placeholder";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { deleteItem } from "@utils/client";

const TableWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

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
    padding: 15px 10px;

    &:nth-child(1) {
      width: 10%;
    }

    &:nth-child(2) {
      width: 15%;
    }

    &:nth-child(3) {
      width: 25%;
    }

    &:nth-child(4) {
      width: 20%;
    }

    &:nth-child(5) {
      width: 20%;
    }

    &:nth-child(6) {
      width: 10%;
    }
  }
`;

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }

    td {
      padding: 15px 10px;

      svg {
        cursor: pointer;
        margin-right: 15px;
      }

      &:nth-child(1) {
        width: 10%;
        cursor: pointer;
        color: ${colors.secondary};
      }

      &:nth-child(2) {
        width: 15%;
      }

      &:nth-child(3) {
        width: 25%;
      }

      &:nth-child(4) {
        width: 20%;
      }

      &:nth-child(5) {
        width: 20%;
      }

      &:nth-child(6) {
        width: 10%;
      }
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

const index: FC = () => {
  // Grid context
  const { length, updatedItems, isLoading } = useContext(GridContext);

  const router = useRouter();

  return (
    <TableWrapper>
      {!updatedItems || isLoading ? (
        <Placeholder />
      ) : (
        <>
          <Button
            margin={{ md: { top: 2, bottom: 2, right: 2 } }}
            variant="primary"
          >
            Add user
          </Button>
          <Table>
            <Thead>
              <tr>
                <td>#ID</td>
                <td>Ime</td>
                <td>Email</td>
                <td>Korisnicko ime</td>
                <td>Role</td>
                <td>Akcije</td>
              </tr>
            </Thead>
            {Array.isArray(updatedItems) &&
              updatedItems.map((item, i) => (
                <Tbody key={i}>
                  <tr>
                    <td onClick={() => copyText(item._id)}>
                      #{item._id.slice(0, 5)}
                    </td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.userName}</td>
                    <td>{item.role}</td>
                    <td>
                      <Icon
                        $icon="trash"
                        $color="iconColor"
                        onClick={() => deleteItem(item._id, router)}
                      />
                      <Icon $icon="edit" $color="iconColor" />
                    </td>
                  </tr>
                </Tbody>
              ))}
          </Table>
        </>
      )}

      {updatedItems && length === 0 && (
        <NotFound>Sorry, we didn't find any items...</NotFound>
      )}
    </TableWrapper>
  );
};

export { index as UserTable };
