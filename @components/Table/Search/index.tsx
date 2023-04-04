// Core types
import { useEffect, type FC, useContext } from "react";

// Styles form
import { Field } from "@styles/Form";
import { Icon as IconStyle } from "@styles";

// Nextjs
import { useRouter } from "next/router";

// Global components
import { Heading, Icon } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Local context
import { GridContext } from "..";

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    top: 62% !important;
    left: 15px !important;
  }

  ${Field} {
    width: 100%;
    min-height: 55px;
    border: 0;
    box-shadow: 0 0 0.375rem 0.25rem rgb(161 172 184 / 15%);
    border-radius: 5px;
  }

  ${({ theme: { defaults, breakpoints } }) => css`
    ${Field} {
      padding: 10px 20px 10px 50px;
    }

    ${IconStyle} {
      pointer-events: none;
      position: absolute;
      left: ${defaults.gutter / 2}px;
      top: 50%;
      transform: translateY(-70%);
      z-index: 8;
    }

    @media (max-width: ${breakpoints.sm}px) {
      flex: 0 0 100%;
    }
  `}
`;

const Clear = styled.div`
  position: absolute;
  right: 20px;
  width: 25px;
  height: 25px;
  top: 20%;
  background-color: rgba(255, 255, 255, 0.123);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
`;

const index: FC = () => {
  // Grid context
  const { searchQuery, setSearchQuery, queryUrl, searchUrl } =
    useContext(GridContext);

  const { push, query } = useRouter();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;

    // Delay search on 1.5 seconds on typing
    if (searchQuery !== undefined) {
      delayDebounceFn = setTimeout(() => {
        push(`?${queryUrl}${searchUrl}&page=${1}`);
      }, 300);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === undefined && query["searchQuery"])
      setSearchQuery(query["searchQuery"].toString());
  }, [, query]);

  return (
    <SearchWrapper>
      <Icon $icon="search" $color="black" />

      <Field
        id="search"
        name="search"
        value={searchQuery}
        onChange={handleChangeSearch}
        placeholder="Search"
      />

      {searchQuery && (
        <Clear
          onClick={() => {
            // Clear the search query
            setSearchQuery("");

            push(`?${queryUrl}${searchUrl}&page=${1}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.942"
            height="13.936"
            viewBox="0 0 13.942 13.936"
          >
            <path
              d="M12.669,0l-5.7,5.7L1.272,0,0,1.273l5.7,5.7L0,12.667l1.272,1.269,5.7-5.7,5.508,5.508,1.272-1.272L8.243,6.968l5.7-5.7Z"
              transform="translate(0 0)"
              fill="#032638"
            />
          </svg>
        </Clear>
      )}
    </SearchWrapper>
  );
};

export { index as Search };
