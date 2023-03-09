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
import { Session } from "next-auth";

interface Layout {
  title: string;
  children: React.ReactNode;
  session: Session;
}

const Layout = styled.div`
  position: relative;
  overflow: hidden;
`;

const Main = styled.div`
  min-height: 80vh;
  width: 100%;
`;

const index: FC<Layout> = ({ title, children, session }) => {
  return (
    <Layout>
      <Head>
        <title>{`${title} - Gradac Trade`}</title>
      </Head>

      <Header />

      <Container>
        <Row>
          <Column responsivity={{ md: 3 }}>
            <Sidebar session={session} />
          </Column>

          <Column responsivity={{ md: 9 }}>
            <Heading
              as="h4"
              weight="semiBold"
              padding={{ md: { top: 8,bottom: 5, left: 2 }, sm: { bottom: 2 } }}
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
