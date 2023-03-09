// Core
import { type FC, createContext, useEffect, useState, useMemo } from "react";

// NextJS
import { useRouter } from "next/router";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Local components
import { Table } from "./Table";
import { Search } from "./Search";
import { Pagination } from "./Pagination";

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

const Container = styled.div`
  max-width: 1162px;
  height: 100%;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  ${({ theme: { defaults } }) => css`
    padding-left: ${defaults.gutter}rem;
    padding-right: ${defaults.gutter}rem;
  `}
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  flex: 1 1 0;
  height: 100%;

  ${({ theme: { defaults } }) => css`
    margin-left: -${defaults.gutter}rem;
    margin-right: -${defaults.gutter}rem;
  `}
`;

const Column = styled.div`
  flex: 0 0 100%;

  ${({ theme: { defaults, breakpoints } }) => css`
    padding: ${defaults.gutter}rem;

    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
    }
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
}

const index: FC<Grid> = ({ $apiPath }) => {
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
  const limit = 16;

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
      setUpdatedItems(items);

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
          <Column>
            <Wrap>
              <Search />
            </Wrap>
          </Column>

          <Column>
            <Table />
          </Column>

          <Column>
            <Pagination />
          </Column>
        </Row>
      </Container>
    </GridContext.Provider>
  );
};

export { index as Grid };
