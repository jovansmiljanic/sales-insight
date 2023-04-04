// Core
import { type FC, useState } from "react";

// NextJS
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Global components
import { AlertBox, Button, Heading, Icon } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Global styles
import { Field, Label } from "@styles";

import { LogoIcon } from "../../svgs/LogoIcon";

const Login = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

const Wrap = styled.div`
  padding: 40px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);

  button {
    width: 100%;
    justify-content: center;
  }

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Password = styled.div`
  position: relative;

  svg {
    width: 20px;
    height: 100%;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    cursor: pointer;
  }
`;

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Korisnicko ime je obavezno polje"),
  password: Yup.string().required("Sifra je obavezno polje"),
});

interface Formvalues {
  userName: string;
  password: string;
}

const index: FC = () => {
  // Handle router
  const router = useRouter();

  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Handle hide/shop password
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Login>
      <Container>
        <Row justifyContent={{ md: "center" }} alignItems={{ md: "center" }}>
          <Column responsivity={{ md: 4, sm: 12 }}>
            <Wrap>
              <Logo>
                <LogoIcon />
              </Logo>

              <Heading
                as="h4"
                weight="semiBold"
                padding={{
                  xs: { bottom: 2 },
                  sm: { bottom: 2 },
                  md: { bottom: 3 },
                }}
              >
                Dobro dosli na Gradac Trade aplikaciju! 👋
              </Heading>

              <AlertBox {...{ errorMessage }} />

              <Formik
                autoComplete="off"
                initialValues={{
                  userName: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={async (
                  values: Formvalues,
                  { setSubmitting }: FormikHelpers<Formvalues>
                ) => {
                  await signIn("Login", {
                    userName: values.userName,
                    password: values.password,
                    redirect: false,
                  }).then(({ error }: any) => {
                    if (error === "Verification failed") {
                      setErrorMessage("Failed");
                    } else {
                      if (error) {
                        // Alert error
                        setErrorMessage(error);

                        // Disable submitting
                        setTimeout(() => {
                          setSubmitting(false);
                        }, 500);
                      } else {
                        // Set error to false
                        setErrorMessage("");

                        // Reroute user to the dashboard
                        router.push("/");
                      }
                    }
                  });
                }}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  handleBlur,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Group>
                      <Label>Korisnicko ime *</Label>
                      <Field
                        type="text"
                        name="userName"
                        placeholder="Molim vas unesite vase korisnicko ime"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                      />

                      {errors.userName && touched.userName ? (
                        <AlertBox errorMessage={errors.userName} />
                      ) : null}
                    </Group>

                    <Group>
                      <Label>Sifra *</Label>

                      <Password>
                        <Field
                          type={visiblePassword ? "text" : "password"}
                          name="password"
                          placeholder="*******"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />

                        <Icon
                          onClick={() => setVisiblePassword(!visiblePassword)}
                          $icon="toggle-eye"
                          $toggled={visiblePassword}
                        />
                      </Password>

                      {errors.password && touched.password ? (
                        <AlertBox errorMessage={errors.password} />
                      ) : null}
                    </Group>

                    <Button
                      variant="secondary"
                      type="submit"
                      margin={{
                        xs: { top: 1 },
                        sm: { top: 1 },
                        md: { top: 1 },
                      }}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Prijava..." : "Prijavite se"}
                    </Button>
                  </form>
                )}
              </Formik>
            </Wrap>
          </Column>
        </Row>
      </Container>
    </Login>
  );
};

export { index as Login };
