// Vendors
import styled, { css } from "styled-components";

export const Label = styled.label`
  flex: 0 0 100%;
  cursor: pointer;
  font-size: 14px;

  ${({ theme: { defaults, colors } }) => css`
    color: ${colors.black};
    margin-bottom: ${defaults.gutter / 2}rem;
  `}
`;
