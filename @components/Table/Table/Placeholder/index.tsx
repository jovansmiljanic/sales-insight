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
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  width: 100%;
  height: 100%;
  animation-name: ${animate};
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const ImageWrap = styled.div`
  flex: 0 0 50%;
  min-width: 100px;
  height: 310px;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      flex: auto;
    }
  `}
`;

const Category = styled.div`
  width: 110px;
  height: 24px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 40px;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      padding: 0;
      padding-top: 20px;
    }
  `}
`;

const Title = styled.div`
  width: 470px;
  height: 70px;
  margin: 15px 0;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 80%;
      margin: 5px 0;
    }
  `}
`;

const Description = styled.div`
  width: 520px;
  height: 70px;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
    }
  `}
`;

const Button = styled.div`
  width: 229px;
  height: 47px;
  margin-top: 20px;
`;

const index: FC = () => {
  return (
    <Item>
      <ImageWrap>
        <Animation />
      </ImageWrap>

      <ContentWrap>
        <Category>
          <Animation />
        </Category>
        <Title>
          <Animation />
        </Title>
        <Description>
          <Animation />
        </Description>
        <Button>
          <Animation />
        </Button>
      </ContentWrap>
    </Item>
  );
};

export { index as Placeholder };
