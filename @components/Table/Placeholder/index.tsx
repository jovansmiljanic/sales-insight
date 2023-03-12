// Core types
import type { FC } from "react";

// Vendors
import styled, { keyframes, css } from "styled-components";

// Create the keyframes
const animate = keyframes`
    0%{
        background-position: -600px 0
    }
    100%{
        background-position: 600px 0
    }
`;

const Animation = styled.div`
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1200px 104px;
  position: relative;
  animation-timing-function: linear;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  width: 100%;
  height: 100%;
  animation-name: ${animate};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);
`;

const TableItem = styled.div`
  width: 100%;
  height: 55px;

  ${({ theme: { colors } }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }
  `}
`;

const index: FC = () => {
  let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <Item>
      {a.map((a) => (
        <TableItem key={a}>
          <Animation />
        </TableItem>
      ))}
    </Item>
  );
};

export { index as Placeholder };
