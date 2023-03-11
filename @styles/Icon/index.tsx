// Vendors
import styled, { css } from "styled-components";

// Global types
import type { Colors, IIcon } from "@types";

export const Icon = styled.svg<IIcon>`
  // Manage icon color
  ${({ $color = "textColor", theme: { colors } }) =>
    css`
      fill: ${colors[$color as Colors]};
    `}

  // Manage icon size
  ${({ $size = 1 }) => {
    switch ($size) {
      case 1:
        return css`
          width: 18px;
          height: 18px;
        `;
      case 2:
        return css`
          width: 24px;
        `;
      case 3:
        return css`
          width: 30px;
        `;
    }
  }}
`;

export const Path = styled.path``;

export const Rect = styled.rect``;

export const Circle = styled.circle``;
