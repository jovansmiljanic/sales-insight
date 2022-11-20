// Core types
import type { FC } from "react";

// Core
import { useContext } from "react";

// GLobal components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Store context
import { StoreContext } from "@context";

// Global types
import { Customer, IArticle } from "@types";

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

const Delete = styled.button`
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: auto;
`;

interface Result {
  customer: Customer;
  article: IArticle[] | undefined;
  address: string;
  valuta: string;
}

const index: FC<Result> = ({ customer, address, article, valuta }) => {
  const { result, setArticles } = useContext(StoreContext);

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  const handleRemove = ({ result, i }: { result: IArticle[]; i: number }) => {
    result.splice(i, 1);

    const updatedArticles = result.filter((res) => res._id === result[0]._id);

    setArticles(updatedArticles);
  };

  return (
    <>
      <Head>
        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Kupac:
          </Heading>

          <Heading as="h6" weight="semiBold">
            {customer.name}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Adresa:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {address}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Valuta:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {valuta}
          </Heading>
        </Wrap>

        <Wrap>
          <Heading as="h6" padding={{ md: { right: 1 }, sm: { right: 1 } }}>
            Datum:
          </Heading>
          <Heading as="h6" weight="semiBold">
            {day}.{month}.{year}.
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
          {article?.map((item: any, i: number) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity} kom</td>
              <td>{item.price} din</td>
              <td>
                <Delete
                  type="button"
                  onClick={() => handleRemove({ result, i })}
                >
                  &times;
                </Delete>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as Table };
