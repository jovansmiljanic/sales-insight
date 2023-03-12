// Core types
import { Icon } from "@components/Icon";
import { deleteItem } from "@utils/client";
import { copyText } from "@utils/shared";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Grid store
import { GridContext } from "..";

// Local component
import { Placeholder } from "../Placeholder";

const TableWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);

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
      width: 8%;
    }

    &:nth-child(2) {
      width: 40%;
    }

    &:nth-child(3) {
      width: 20%;
    }

    &:nth-child(4) {
      width: 20%;
    }

    &:nth-child(5) {
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
        width: 40%;
      }

      &:nth-child(3) {
        width: 20%;
      }

      &:nth-child(4) {
        width: 20%;
      }

      &:nth-child(5) {
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
          <Table>
            <Thead>
              <tr>
                <td>#ID</td>
                <td>Kupac</td>
                <td>PIB</td>
                <td>Komercijalista</td>
                <td>Akcije</td>
              </tr>
            </Thead>
            {Array.isArray(updatedItems) &&
              updatedItems.map((item, i) => (
                <Tbody key={i}>
                  <tr>
                    <td onClick={() => copyText(item.customer.customerId)}>
                      #{item.customer.customerId}
                    </td>
                    <td>{item.customer.name}</td>
                    <td>{item.customer.pib}</td>
                    <td>{item.owner}</td>
                    <td>
                      <Link href={`/my-orders/${item._id}`}>
                        <Icon $icon="preview" $color="iconColor" />
                      </Link>
                      <Icon $icon="edit" $color="iconColor" />
                      <Icon
                        $icon="trash"
                        $color="iconColor"
                        onClick={() => deleteItem(item._id, router)}
                      />
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

export { index as OrdersTable };
