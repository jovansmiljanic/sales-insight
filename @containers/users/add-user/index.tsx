// Core types
import { FC, useState } from "react";

// Vendors
import * as Yup from "yup";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { Formik, FormikHelpers } from "formik";

// Global components
import { AlertBox, Button, Heading, Icon } from "@components";
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
  padding-bottom: 25px;
`;

const Wrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  z-index: 300;
  padding: 40px 20px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);
`;

const Password = styled.div`
  position: relative;

  svg {
    width: 20px;
    height: 100%;
    position: absolute;
    top: 20%;
    right: 10px;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 300;
`;

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Ime i prezime je obavezno polje"),
  userName: Yup.string().required("Korisničko ime je obavezno polje"),
  email: Yup.string().required("Mejl ime je obavezno polje"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Šifra je obavezno polje"),
});

interface Formvalues {
  fullName: string;
  email: string;
  userName: string;
  password: string;
}

interface Adduser {
  setAddUser: any;
}

const index: FC<Adduser> = ({ setAddUser }) => {
  // Router
  const router = useRouter();

  // Handle hide/shop password
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Overlay>
      <Wrapper>
        <Heading
          as="h4"
          weight="semiBold"
          padding={{ md: { top: 2, bottom: 4 } }}
        >
          Dodaj komercijalistu
        </Heading>

        <Formik
          autoComplete="off"
          initialValues={{
            fullName: "",
            email: "",
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
                setAddUser(false);
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
                  placeholder="Molim vas unesite ime i prezime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />

                {errors.fullName && touched.fullName ? (
                  <AlertBox errorMessage={errors.fullName} />
                ) : null}
              </Group>
              <Group>
                <Label>Email*</Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Molim vas unesite e-mail adresu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                {errors.email && touched.email ? (
                  <AlertBox errorMessage={errors.email} />
                ) : null}
              </Group>

              <Group>
                <Label>Korisničko ime*</Label>
                <Field
                  type="text"
                  name="userName"
                  placeholder="Molim vas unesite korisnicko ime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />

                {errors.userName && touched.userName ? (
                  <AlertBox errorMessage={errors.userName} />
                ) : null}
              </Group>

              <Group>
                <Password>
                  <Label>Šifra*</Label>

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

              <Button type="submit" variant="primary">
                {isSubmitting ? "Dodaje se" : "Dodaj"}
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Overlay>
  );
};

export { index as AddUser };
