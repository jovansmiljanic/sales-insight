// Core types
import type { FC } from "react";

// Vendors
import * as Yup from "yup";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { Formik, FormikHelpers } from "formik";

// Global components
import { AlertBox, Button } from "@components";
import { Column, Container, Row } from "@components/Grid";

// Form styles
import { Field, Label } from "@styles";

// NextJS
import { useRouter } from "next/router";

const Form = styled.form`
  position: relative;
  z-index: 10;
`;

const Group = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Ime i prezime je obavezno"),
  userName: Yup.string().required("Korisničko ime je obavezno"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Šifra je obavezna"),
});

interface Formvalues {
  fullName: string;
  userName: string;
  password: string;
}
const index: FC = ({}) => {
  // Router
  const router = useRouter();

  return (
    <Container>
      <Row>
        <Column responsivity={{ md: 12 }}>
          <Formik
            autoComplete="off"
            initialValues={{
              fullName: "",
              userName: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (
              data: Formvalues,
              { setSubmitting }: FormikHelpers<Formvalues>
            ) => {
              await axios({
                method: "POST",
                url: "/api/users",
                data,
              })
                .then((res: AxiosResponse) => {
                  router.push("/users");
                })
                .catch(({ response }) => {
                  // Set error message
                  console.log(response);
                  // Set submiting to false
                  setSubmitting(false);
                });
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form id="myForm" onSubmit={handleSubmit}>
                <Group>
                  <Label>Ime i prezime*</Label>
                  <Field
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                  />

                  {errors.fullName && touched.fullName ? (
                    <AlertBox errorMessage={errors.fullName} />
                  ) : null}
                </Group>

                <Group>
                  <Label>Korisničko ime*</Label>
                  <Field
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />

                  {errors.userName && touched.userName ? (
                    <AlertBox errorMessage={errors.userName} />
                  ) : null}
                </Group>

                <Group>
                  <Label>Šifra*</Label>
                  <Field
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  {errors.password && touched.password ? (
                    <AlertBox errorMessage={errors.password} />
                  ) : null}
                </Group>

                <Button type="submit" variant="primary">
                  {isSubmitting ? "Dodaje se" : "Dodaj"}
                </Button>
              </Form>
            )}
          </Formik>
        </Column>
      </Row>
    </Container>
  );
};

export { index as AddUser };
