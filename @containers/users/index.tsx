// Global grid components
import { Column, Container, Row } from "@components/Grid";
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
  align-items: flex-end;

  input {
    flex: auto !important;
  }
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
      url: "/api/users",
      data: _id,
    })
      .then((res: AxiosResponse) => {
        router.push("/users");
      })
      .catch(({ response }) => {
        // Set error message
        console.log(response?.statusText);
      });
  };

  return (
    <Container>
      <Row>
        <Column responsivity={{ md: 12 }}>
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

                  {/* <Button
                    variant="danger"
                    margin={{ md: { top: 1 }, sm: { top: 1 } }}
                    onClick={() => deleteUser(users._id)}
                  > */}
                  {/* </Button> */}

                  <div onClick={() => deleteUser(users._id)}>X</div>
                </UserWrap>
              </Fragment>
            ))}
        </Column>
      </Row>
    </Container>
  );
};

export { index as Users };
