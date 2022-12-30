// Core types
import { FC } from "react";

// Core
import { useEffect, useRef, useState } from "react";

// NextJS
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// Vendors
import styled, { css } from "styled-components";

const Wrap = styled.div`
  position: absolute;
`;

const Wrapper = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  cursor: pointer;
`;

const ArrowOne = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 1px;
  width: 100%;
  border: 1px solid black;
`;

const ArrowTwo = styled.div`
  position: absolute;
  top: 50%;
  left: 0;

  height: 1px;
  width: 100%;
  border: 1px solid black;
`;

const ArrowThree = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  height: 1px;
  width: 100%;
  border: 1px solid black;
`;

const UserModal = styled.div`
  position: absolute;
  top: 55px;
  right: 0px;
  z-index: 100;
  min-width: 250px;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  a {
    color: inherit;
    padding-top: 15px;
  }

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    background-color: ${colors.white};
  `};
`;

const Arrow = styled.div`
  position: absolute;
  top: -12px;
  right: 10px;

  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid rgba(255, 255, 255);
  -webkit-filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.2));
`;

const SignOut = styled.button`
  cursor: pointer;
  padding-top: 15px;
`;

const UserWrap = styled.h6`
  padding-bottom: 15px;
  border-bottom: 1px solid #ebebeb;
  font-weight: 600;
`;

const OptionsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index: FC = () => {
  // Check session
  const { data: session } = useSession();

  // Hide dropdown when clicked outside it's Ref
  const resourcesPopupRef = useRef<HTMLDivElement>(null);

  // Toggle resources dropdown
  const [toggledResources, setToggleResources] = useState<boolean>(false);

  const handleClickOutside = (event: any) => {
    if (
      resourcesPopupRef.current &&
      !resourcesPopupRef.current.contains(event.target as Element)
    ) {
      setToggleResources(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Wrap ref={resourcesPopupRef}>
      <Wrapper onClick={() => setToggleResources(!toggledResources)}>
        <ArrowOne />
        <ArrowTwo />
        <ArrowThree />
      </Wrapper>

      {toggledResources && (
        <UserModal>
          <Arrow />

          <UserWrap>{session?.user.userName}</UserWrap>

          <OptionsWrap>
            <SignOut onClick={() => signOut()}>Odjava</SignOut>
          </OptionsWrap>
        </UserModal>
      )}
    </Wrap>
  );
};

export { index as UserModal };
