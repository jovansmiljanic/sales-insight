// Core types
import type { FC } from "react";

// Core
import { useContext } from "react";

// NextJS
import Link from "next/link";
import { useSession } from "next-auth/react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { UserModal } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Store Context
import { StoreContext } from "@context";

const CustomLink = styled.span`
  padding: 0 5px;
  text-decoration: underline;
  font-weight: bold;
  color: initial;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const index: FC = () => {
  const { isTablet } = useContext(StoreContext);

  // Get session
  const { data: session } = useSession();

  return (
    <Container>
      {/* <Row
        justifyContent={{ md: "center", sm: "space-between" }}
        alignItems={{ md: "center", sm: "center" }}
        padding={{ md: { top: 2, bottom: 2 }, sm: { top: 2, bottom: 2 } }}
      > */}
      {/* <Column responsivity={{ md: 3, sm: 4 }}>
          <Link href="/">
            <CustomLink>
             
            </CustomLink>
          </Link>
        </Column> */}

      {/* <Column responsivity={{ md: 9, sm: 4 }}>
            {isTablet && session?.user && (
              <Nav>
                <UserModal />
              </Nav>
            )}

            {!isTablet && session?.user && (
              <Nav>
                <UserModal />
              </Nav>
            )}
          </Column> */}
      {/* </Row> */}
    </Container>
  );
};

export { index as Header };
