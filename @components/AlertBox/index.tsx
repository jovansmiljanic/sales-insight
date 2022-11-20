// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const AlertBox = styled.div<{ success: boolean; error: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px;
  margin-bottom: 10px;
  font-size: 12px;

  ${({ error, success, theme: { defaults, colors, font, ...theme } }) => css`
    font-weight: ${font.weight.semiBold};

    ${error &&
    css`
      border: 1px solid ${colors.danger};
      border-top: none;
      background-color: ${colors.danger};
      color: ${colors.white};
    `}

    ${success &&
    css`
      border: 2px solid ${colors.success};
      color: ${colors.success};
      background-color: ${colors.white};
    `}
  `}
`;

interface AlertBox {
  errorMessage: string | undefined;
  successMessage?: string | undefined;
}

const index: FC<AlertBox> = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return <></>;
  }

  return (
    <AlertBox success={Boolean(successMessage)} error={Boolean(errorMessage)}>
      {successMessage}
      {errorMessage}
    </AlertBox>
  );
};

export { index as AlertBox };
