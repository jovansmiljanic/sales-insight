// Vendors
import styled, { css } from "styled-components";

type Label = {};

export const Label = styled.label<Label>`
  flex: 0 0 100%;
  cursor: pointer;
  font-size: 16px;

  ${({ theme: { defaults, font, colors } }) => css`
    font-weight: ${font.weight.semiBold};
    color: ${colors.black};
    margin-bottom: ${defaults.gutter / 4}px;
  `}
`;
