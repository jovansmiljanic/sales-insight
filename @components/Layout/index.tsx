// Core types
import { type FC } from "react";

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

      <Container>
        <Row padding={{ md: { top: 10 } }}>
          <Column responsivity={{ md: 3 }}>
            <Sidebar />
          </Column>

          <Column responsivity={{ md: 9 }}>
            <Heading
              as="h4"
              weight="semiBold"
              padding={{ md: { bottom: 5, left: 2 }, sm: { bottom: 2 } }}
            >
              {title}
            </Heading>

            <Main>{children}</Main>
          </Column>
        </Row>
      </Container>

      <Footer />
    </Layout>
  );
};

export { index as Layout };
