// Core types
import { FC, Fragment } from "react";

// GLobal components
import { Button, Heading } from "@components";

// Global containers
import { User } from "@types";

// NextJS
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// Vendors
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";

// Global styles
import { Field, Label } from "@styles";

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface AllUsers {
  users: User[];
}

const index: FC<AllUsers> = ({ users }) => {
  const { data: session } = useSession();

  const updatedUsers = users.filter(({ _id }) => _id !== session?.user._id);

  const router = useRouter();

  const deleteUser = async (_id: any) => {
    await axios({
      method: "DELETE",
      url: "/api/registration",
      data: _id,
    })
      .then((res: AxiosResponse) => {
        router.push("/");
      })
      .catch(({ response }) => {
        // Set error message
        console.log(response?.statusText);
      });
  };

  return (
    <>
      <Heading
        as="h2"
        weight="bold"
        padding={{ md: { bottom: 3 }, sm: { top: 8, bottom: 2 } }}
      >
        Svi komercijalisti
      </Heading>

      {Array.isArray(updatedUsers) &&
        updatedUsers.map((users, i) => (
          <Fragment key={users.userName}>
            <Label>Komercijalista {i + 1}</Label>

            <UserWrap>
              <Field
                type="text"
                name="userName"
                disabled
                value={users.userName}
              />

              <Button
                variant="danger"
                margin={{ md: { top: 1 }, sm: { top: 1 } }}
                onClick={() => deleteUser(users._id)}
              >
                Izbrisi
              </Button>
            </UserWrap>
          </Fragment>
        ))}
    </>
  );
};

export { index as AllUsers };
