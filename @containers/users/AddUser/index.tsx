// Core types
import type { FC } from "react";

// Core
import { useState } from "react";

// Vendors
import * as Yup from "yup";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { Formik, FormikHelpers } from "formik";

// Global components
import { AlertBox, Button, Heading } from "@components";

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
  userName: Yup.string().required("User name is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
});

interface Formvalues {
  userName: string;
  password: string;
}

const index: FC = () => {
  // Router
  const router = useRouter();

  return (
    <>
      <Heading
        as="h2"
        weight="bold"
        padding={{ md: { bottom: 3 }, sm: { bottom: 2 } }}
      >
        Dodaj komercijalistu
      </Heading>

      <Formik
        autoComplete="off"
        initialValues={{
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
            url: "/api/registration",
            data,
          })
            .then((res: AxiosResponse) => {
              router.push("/");
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
              <Label>Korisnicko ime*</Label>
              <Field
                type="text"
                name="userName"
                placeholder="Korisnicko ime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />

              {errors.userName && touched.userName ? (
                <AlertBox errorMessage={errors.userName} />
              ) : null}
            </Group>

            <Group>
              <Label>Sifra</Label>
              <Field
                type="password"
                name="password"
                placeholder="Sifra"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              {errors.password && touched.password ? (
                <AlertBox errorMessage={errors.password} />
              ) : null}
            </Group>

            <Button
              type="submit"
              variant="primary"
              margin={{ md: { bottom: 2 }, sm: { bottom: 2 } }}
            >
              {isSubmitting ? "Dodaje se" : "Dodaj"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { index as AddUser };
