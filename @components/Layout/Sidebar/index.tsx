// Core types
import { type FC, useContext, useEffect } from "react";

// Global components
import { Heading } from "@components";

// Store context
import { StoreContext } from "@context";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Session } from "next-auth";

const Sidebar = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0.8px 0.8px 1.8px;
  width: 100%;
  height: 100%;
`;

const Item = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  ${({ active, theme: { defaults, colors, font } }) => css`
    padding: ${defaults.gutter}rem 0;

    ${active &&
    `
      background-color: ${colors.white};
      font-weight: ${font.weight.semiBold};
    `}

    svg {
      margin-right: 13px;
    }

    &:hover {
      background-color: ${colors.white};
    }
  `}
`;

const User = styled.div`
  display: flex;

  padding: 20px 0;
`;

const UserName = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    color: ${colors.white};
    background-color: ${colors.primary};
  `}
`;

const Wrap = styled.div`
  padding-left: 10px;
`;

interface Sidebar {
  session: Session;
}

const index: FC<Sidebar> = ({ session }) => {
  // Next router
  const router = useRouter();

  const { activeItem, setActiveItem } = useContext(StoreContext);

  const sidebarItems = [
    {
      path: "/",
      label: "Novo trbovanje",
      role: [1, 2],
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 7.5C3.08333 7.5 2.72933 7.354 2.438 7.062C2.146 6.77067 2 6.41667 2 6C2 5.58333 2.146 5.22933 2.438 4.938C2.72933 4.646 3.08333 4.5 3.5 4.5C3.91667 4.5 4.27067 4.646 4.562 4.938C4.854 5.22933 5 5.58333 5 6C5 6.41667 4.854 6.77067 4.562 7.062C4.27067 7.354 3.91667 7.5 3.5 7.5ZM3.5 13.5C3.08333 13.5 2.72933 13.354 2.438 13.062C2.146 12.7707 2 12.4167 2 12C2 11.5833 2.146 11.2293 2.438 10.938C2.72933 10.646 3.08333 10.5 3.5 10.5C3.91667 10.5 4.27067 10.646 4.562 10.938C4.854 11.2293 5 11.5833 5 12C5 12.4167 4.854 12.7707 4.562 13.062C4.27067 13.354 3.91667 13.5 3.5 13.5ZM3.5 19.5C3.08333 19.5 2.72933 19.354 2.438 19.062C2.146 18.7707 2 18.4167 2 18C2 17.5833 2.146 17.2293 2.438 16.938C2.72933 16.646 3.08333 16.5 3.5 16.5C3.91667 16.5 4.27067 16.646 4.562 16.938C4.854 17.2293 5 17.5833 5 18C5 18.4167 4.854 18.7707 4.562 19.062C4.27067 19.354 3.91667 19.5 3.5 19.5ZM8 7C7.71667 7 7.479 6.90433 7.287 6.713C7.09567 6.521 7 6.28333 7 6C7 5.71667 7.09567 5.479 7.287 5.287C7.479 5.09567 7.71667 5 8 5H20V7H8ZM8 13C7.71667 13 7.479 12.904 7.287 12.712C7.09567 12.5207 7 12.2833 7 12C7 11.7167 7.09567 11.479 7.287 11.287C7.479 11.0957 7.71667 11 8 11H18C17.05 11 16.1583 11.179 15.325 11.537C14.4917 11.8957 13.7583 12.3833 13.125 13H8ZM11.075 19H8C7.71667 19 7.479 18.904 7.287 18.712C7.09567 18.5207 7 18.2833 7 18C7 17.7167 7.09567 17.4793 7.287 17.288C7.479 17.096 7.71667 17 8 17H11.075C11.025 17.3333 11 17.6667 11 18C11 18.3333 11.025 18.6667 11.075 19ZM18 23C16.6167 23 15.4377 22.5127 14.463 21.538C13.4877 20.5627 13 19.3833 13 18C13 16.6167 13.4877 15.4373 14.463 14.462C15.4377 13.4873 16.6167 13 18 13C19.3833 13 20.5627 13.4873 21.538 14.462C22.5127 15.4373 23 16.6167 23 18C23 19.3833 22.5127 20.5627 21.538 21.538C20.5627 22.5127 19.3833 23 18 23ZM17.5 18.5V20.5C17.5 20.6333 17.55 20.75 17.65 20.85C17.75 20.95 17.8667 21 18 21C18.1333 21 18.25 20.95 18.35 20.85C18.45 20.75 18.5 20.6333 18.5 20.5V18.5H20.5C20.6333 18.5 20.75 18.45 20.85 18.35C20.95 18.25 21 18.1333 21 18C21 17.8667 20.95 17.75 20.85 17.65C20.75 17.55 20.6333 17.5 20.5 17.5H18.5V15.5C18.5 15.3667 18.45 15.25 18.35 15.15C18.25 15.05 18.1333 15 18 15C17.8667 15 17.75 15.05 17.65 15.15C17.55 15.25 17.5 15.3667 17.5 15.5V17.5H15.5C15.3667 17.5 15.25 17.55 15.15 17.65C15.05 17.75 15 17.8667 15 18C15 18.1333 15.05 18.25 15.15 18.35C15.25 18.45 15.3667 18.5 15.5 18.5H17.5Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      path: "/my-orders",
      label: "Moja trebovanja",
      role: [1, 2],
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 14C15.1667 14 14.4583 13.7083 13.875 13.125C13.2917 12.5417 13 11.8333 13 11C13 10.1667 13.2917 9.45833 13.875 8.875C14.4583 8.29167 15.1667 8 16 8C16.8333 8 17.5417 8.29167 18.125 8.875C18.7083 9.45833 19 10.1667 19 11C19 11.8333 18.7083 12.5417 18.125 13.125C17.5417 13.7083 16.8333 14 16 14ZM10 20V18.1C10 17.75 10.0833 17.4167 10.25 17.1C10.4167 16.7833 10.65 16.5333 10.95 16.35C11.7 15.9 12.496 15.5623 13.338 15.337C14.1793 15.1123 15.0667 15 16 15C16.9333 15 17.821 15.1123 18.663 15.337C19.5043 15.5623 20.3 15.9 21.05 16.35C21.35 16.5333 21.5833 16.7833 21.75 17.1C21.9167 17.4167 22 17.75 22 18.1V20H10ZM3 14V12H11V14H3ZM3 6V4H15V6H3ZM11.1 10H3V8H12C11.7667 8.28333 11.5793 8.59167 11.438 8.925C11.296 9.25833 11.1833 9.61667 11.1 10V10Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      path: "/orders",
      label: "Sva trebovanja",
      role: [1],
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM7 19H21V17H7V19ZM7 13H21V11H7V13ZM7 5V7H21V5H7Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      path: "/users",
      label: "Komercijalisti",
      role: [1],
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM12.5 7.5C12.5 6.80776 12.2947 6.13108 11.9101 5.5555C11.5256 4.97993 10.9789 4.53133 10.3394 4.26642C9.69985 4.00151 8.99612 3.9322 8.31718 4.06725C7.63825 4.2023 7.01461 4.53564 6.52513 5.02513C6.03564 5.51461 5.7023 6.13825 5.56725 6.81718C5.4322 7.49612 5.50152 8.19985 5.76642 8.83939C6.03133 9.47893 6.47993 10.0256 7.0555 10.4101C7.63108 10.7947 8.30777 11 9 11C9.92826 11 10.8185 10.6312 11.4749 9.97487C12.1313 9.3185 12.5 8.42826 12.5 7.5M15.94 13C16.5547 13.4757 17.0578 14.0804 17.4137 14.7715C17.7696 15.4626 17.9697 16.2233 18 17V19H22V17C22 17 22 13.37 15.94 13M15 4C14.3117 3.99617 13.6385 4.20195 13.07 4.59C13.6774 5.43874 14.0041 6.45629 14.0041 7.5C14.0041 8.54371 13.6774 9.56126 13.07 10.41C13.6385 10.798 14.3117 11.0038 15 11C15.9283 11 16.8185 10.6312 17.4749 9.97487C18.1313 9.3185 18.5 8.42826 18.5 7.5C18.5 6.57174 18.1313 5.6815 17.4749 5.02513C16.8185 4.36875 15.9283 4 15 4V4Z"
            fill="black"
          />
        </svg>
      ),
    },
    {
      path: "/add-user",
      label: "Dodaj komercijalistu",
      role: [1],
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 17V19H7V17C7 17 7 13 13 13C19 13 19 17 19 17ZM16 8C16 7.40666 15.8241 6.82664 15.4944 6.33329C15.1648 5.83994 14.6962 5.45542 14.1481 5.22836C13.5999 5.0013 12.9967 4.94189 12.4147 5.05764C11.8328 5.1734 11.2982 5.45912 10.8787 5.87868C10.4591 6.29824 10.1734 6.83279 10.0576 7.41473C9.94189 7.99667 10.0013 8.59987 10.2284 9.14805C10.4554 9.69623 10.8399 10.1648 11.3333 10.4944C11.8266 10.8241 12.4067 11 13 11C13.7956 11 14.5587 10.6839 15.1213 10.1213C15.6839 9.55871 16 8.79565 16 8ZM19.2 13.06C19.7466 13.5643 20.1873 14.1724 20.4964 14.8489C20.8054 15.5254 20.9766 16.2566 21 17V19H24V17C24 17 24 13.55 19.2 13.06M18 5C17.6979 5.00018 17.3976 5.04741 17.11 5.14C17.6951 5.97897 18.0087 6.97718 18.0087 8C18.0087 9.02282 17.6951 10.021 17.11 10.86C17.3976 10.9526 17.6979 10.9998 18 11C18.7956 11 19.5587 10.6839 20.1213 10.1213C20.6839 9.55871 21 8.79565 21 8C21 7.20435 20.6839 6.44129 20.1213 5.87868C19.5587 5.31607 18.7956 5 18 5ZM8 10H5V7H3V10H0V12H3V15H5V12H8V10Z"
            fill="black"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    setActiveItem(router.asPath);
  }, [router]);

  function onlyCapitalLetters(str: string) {
    return str.replace(/[^A-Z]+/g, "");
  }
  function getRole(num: number) {
    switch (num) {
      case 1:
        return "Admin";

      case 2:
        return "Komercijalista";

      default:
    }
  }

  return (
    <Sidebar>
      <User>
        <UserName>{onlyCapitalLetters(session.user.userName)}</UserName>

        <Wrap>
          <Heading as="h6" weight="bold">
            {session.user.userName}
          </Heading>

          <Heading as="p">{getRole(session.user.role)}</Heading>
        </Wrap>
      </User>

      {Array.isArray(sidebarItems) &&
        session &&
        sidebarItems
          .filter((item) => item.role.includes(session.user.role))
          .map((item, i) => (
            <Item
              key={i}
              active={Boolean(item.path === activeItem)}
              onClick={() => {
                router.push(item.path);
                setActiveItem(i);
              }}
            >
              {item.icon}

              <Heading as="h6">{item.label}</Heading>
            </Item>
          ))}
    </Sidebar>
  );
};

export { index as Sidebar };
