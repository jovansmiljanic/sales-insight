// Core
import { type FC, createContext, useEffect, useState, useMemo } from "react";

// NextJS
import { Session } from "next-auth";
import { useRouter } from "next/router";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Local components
import { Search } from "./Search";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import { OrdersTable } from "./OrdersTable";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Heading } from "@components";

// Vendors
import axios from "axios";
import styled, { css } from "styled-components";

interface IFilters {
  type?: string | string[];
}

interface Filter {
  label: string;
  value: string;
}

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
  `}
`;

interface Checkbox {
  label: string;
  value: string;
}

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedItems?: any;
  isLoading: boolean;
}

export const GridContext = createContext({} as IGridContext);

interface Grid {
  $apiPath: string;
  $title: string;
  $users?: boolean;
  $orders?: boolean;
  $myOrders?: boolean;
  $session?: Session;
}

const index: FC<Grid> = ({
  $apiPath,
  $title,
  $orders,
  $users,
  $myOrders,
  $session,
}) => {
  const { query } = useRouter();

  // Declare filters
  const [filters, setFilters] = useState<IFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Declare pagination
  const [page, setPage] = useState(0);
  const pageMemo = useMemo(() => page, [page]);

  // Declare search query
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  // Store Original and Updated/Filtered items
  const [updatedItems, setUpdatedItems] = useState<any[]>();

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Store the current limit of the pagination
  const limit = 12;

  // Fetch items
  interface IFetch {
    page: number;
  }

  const queryUrl = objectToQuery<IFilters>({ query: filters });
  const searchUrl =
    searchQuery !== undefined && searchQuery !== ""
      ? `&searchQuery=${searchQuery}`
      : "";

  const fetchItems = async ({ page }: IFetch) => {
    // Set loader
    setIsLoading(true);

    // Call axios with filters and page as a string url
    const url = `/api/${$apiPath}/?${queryUrl}${searchUrl}&page=${page}&limit=${limit}&skip=${pageMemo}`;

    await axios.get(url).then(({ data: { items, length } }) => {
      if ($myOrders) {
        const myOrders = items.filter(
          (item: any) => item.owner === $session?.user.userName
        );

        setUpdatedItems(myOrders);
      } else {
        setUpdatedItems(items);
      }

      // Length
      setLength(length);

      // Set loader
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const { page: queryPage, searchQuery, ...rest } = query;

    // Update filters
    if (!isObjectEmpty(rest)) setFilters(rest);
    if (isObjectEmpty(rest)) setFilters({});

    // Update page number
    if (queryPage) setPage(Math.round(Number(queryPage.toString())));
    else setPage(0);
  }, [query]);

  useDebouncedEffect(
    () =>
      // Fetch items from page 0
      fetchItems({
        page: 0,
      }),
    [, filtersMemo],
    50
  );

  useDebouncedEffect(
    () =>
      fetchItems({
        page: pageMemo,
      }),
    [pageMemo],
    50
  );

  return (
    <GridContext.Provider
      value={{
        page: pageMemo,
        searchQuery,
        setSearchQuery,
        queryUrl: queryUrl,
        length,
        limit,
        searchUrl,
        updatedItems,
        isLoading,
      }}
    >
      <Container>
        <Row>
          <Column
            responsivity={{ md: 12 }}
            padding={{
              xs: { top: 4 },
              sm: { top: 4 },
              md: { top: 4 },
            }}
          >
            <Wrap>
              <Search />
            </Wrap>
          </Column>

          <Column
            responsivity={{ md: 12 }}
            padding={{
              xs: { top: 4, bottom: 2 },
              sm: { top: 4, bottom: 2 },
              md: { top: 8, bottom: 4 },
            }}
          >
            <Heading as="h4" weight="semiBold">
              {$title}
            </Heading>
          </Column>

          <Column responsivity={{ md: 12 }}>
            {$users && <UserTable />}

            {($orders || $myOrders) && <OrdersTable />}
          </Column>

          <Column responsivity={{ md: 12 }}>
            <Pagination />
          </Column>
        </Row>
      </Container>
    </GridContext.Provider>
  );
};

export { index as Grid };
