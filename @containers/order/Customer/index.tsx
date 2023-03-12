// Core types
import type { FC } from "react";

// Core
import { Fragment, useContext, useState } from "react";

// Store xontext
import { StoreContext } from "@context";

// GLobal styles
import { Field } from "@styles";

// Global types
import { Customer as CustomerData } from "@types";

// Vendors
import styled, { css } from "styled-components";

const Customers = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 15px;

  ${({ theme: { defaults, colors, font, breakpoints, ...theme } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      margin-bottom: 0px;
    }
  `}
`;

const Wrap = styled.div`
  position: relative;
  width: 49.7%;

  ${({ theme: { defaults, colors, font, breakpoints, ...theme } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      margin-bottom: 15px;
    }
  `}
`;

const SuggestionWrap = styled.div`
  border-radius: 0 0 2px 2px;
  border-top: 0;

  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 10;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    background-color: ${colors.white};
    border: 1px solid ${colors.textColor};
  `}
`;

const Suggestions = styled.div`
  display: flex;
  cursor: pointer;
  padding: 12px 18px;
  font-size: 14px;

  &:hover {
    cursor: pointer;

    ${({ theme: { defaults, colors, font, ...theme } }) => css`
      background-color: ${colors.lightGray};
    `}
  }
`;

const Border = styled.div`
  width: 97%;
  margin: auto;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }
  `}
`;

interface Customer {
  customersData: CustomerData[];
}

const index: FC<Customer> = ({ customersData }) => {
  const {
    setIsActive,
    isActive,
    setCustomer,
    address,
    setAddress,
    customerName,
    setCustomerName,
  } = useContext(StoreContext);

  // State for customer suggestions
  const [customerSuggestions, setCustomerSuggestions] = useState<
    CustomerData[]
  >([]);

  const onCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);

    if (e.target.value.length > 0) {
      let matches: CustomerData[] = [];

      matches = customersData.filter((customer) => {
        return customer.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });

      setCustomerSuggestions(matches);
    } else {
      let matches: CustomerData[] = [];
      setCustomerSuggestions(matches);
    }
  };

  const handleSuggestions = (customer: CustomerData) => {
    setCustomer(customer);
    setCustomerName(customer.name);
    setIsActive(!isActive);
  };

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <Customers>
      <Wrap>
        <Field
          type="text"
          name="customer"
          placeholder="Kupac"
          onChange={onCustomerChange}
          onBlur={() => {
            setTimeout(() => {
              setCustomerSuggestions([]);
            }, 200);
          }}
          value={customerName}
          halfSize
        />

        {customerSuggestions.length !== 0 && (
          <SuggestionWrap>
            {Array.isArray(customerSuggestions) &&
              customerSuggestions.slice(0, 5).map((customerSuggestions, i) => (
                <Fragment key={i}>
                  <Suggestions
                    onClick={() => {
                      handleSuggestions(customerSuggestions);
                    }}
                  >
                    {customerSuggestions.name}
                  </Suggestions>
                  <Border />
                </Fragment>
              ))}
          </SuggestionWrap>
        )}
      </Wrap>

      <Wrap>
        <Field
          type="text"
          name="address"
          placeholder="Adresa"
          onChange={onAddressChange}
          value={address}
          halfSize
        />
      </Wrap>
    </Customers>
  );
};

export { index as Customer };
