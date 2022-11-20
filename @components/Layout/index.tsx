// Core types
import type { FC } from "react";

// NextJS
import Head from "next/head";

// Local components
import { Footer } from "./Footer";
import { Header } from "./Header";

// Vendors
import styled from "styled-components";

interface Layout {
  title: string;
  children: React.ReactNode;
}

const Layout = styled.div`
  position: relative;
  overflow: hidden;
`;

const Main = styled.div`
  min-height: 80vh;
  width: 100%;
`;

const index: FC<Layout> = ({ title, children }) => {
  return (
    <Layout>
      <Head>
        <title>{`${title} - Gradac Trade`}</title>
      </Head>

      <Header />

      <Main>{children}</Main>

      <Footer />
    </Layout>
  );
};

export { index as Layout };
