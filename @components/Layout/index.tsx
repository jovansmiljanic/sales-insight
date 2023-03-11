// Core types
import { useState, type FC } from "react";

// NextJS
import Head from "next/head";

// Global components
import { Column, Container, Row } from "@components/Grid";

// Local components
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { Session } from "next-auth";

interface Layout {
  title: string;
  children: React.ReactNode;
  session: Session;
}

const Layout = styled.div`
  position: relative;
  overflow: hidden;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

const Main = styled.div<{ sidebar: boolean }>`
  padding-left: 100px;

  ${({ sidebar }) => css`
    ${sidebar &&
    `
     padding-left: 290px;
  `}
  `}
`;

const index: FC<Layout> = ({ title, children, session }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <Layout>
      <Sidebar
        session={session}
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
      />

      <Main sidebar={sidebarOpened}>{children}</Main>

      <Footer />
    </Layout>
  );
};

export { index as Layout };
