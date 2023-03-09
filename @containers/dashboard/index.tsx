// Core types
import type { FC } from "react";

// // Core
// import { useContext } from "react";

// // GLobal grid components
// import { Column, Container, Row } from "@components/Grid";

// // Global components
// import { Button } from "@components";

// // Local components
// import { Table } from "./Table";
// import { Articles } from "./Articles";
// import { Customer } from "./Customer";

// // Vendors
// import * as Yup from "yup";
// import { Formik } from "formik";
// import axios, { AxiosResponse } from "axios";

// Global types
import { Article as Articletype, Customer as Customertype } from "@types";
import { Grid } from "@components/Table";
// import { Grid } from "./Grid";

// // Store context
// import { StoreContext } from "@context";

// // Client utils
// import { resetOrder } from "@utils/client";

// interface Formvalues {
//   customer: { customerId: string; name: string; pib: string };
//   articles: [{ name: string; quantity: string; price: string }];
//   address: string;
//   valuta: string;
// }

// const OrderSchema = Yup.object().shape({
//   customer: Yup.object(),
//   articles: Yup.array(),
//   address: Yup.string(),
//   valuta: Yup.string(),
// });

interface Dashboard {
  // articlesData: Articletype[];
  // customersData: Customertype[];
}

const index: FC<Dashboard> = () => {
  // const {
  //   customer,
  //   articles,
  //   address,
  //   valuta,
  //   isActive,
  //   setCustomer,
  //   setArticles,
  //   setAddress,
  //   setValuta,
  //   setCustomerName,
  //   setIsActive,
  //   setResult,
  // } = useContext(StoreContext);

  return (
    <Grid $apiPath="customers" />

    // <Formik
    //   autoComplete="off"
    //   initialValues={{
    //     customer: { customerId: "", name: "", pib: "" },
    //     articles: [{ name: "", quantity: "", price: "" }],
    //     address: "",
    //     valuta: "",
    //   }}
    //   validationSchema={OrderSchema}
    //   onSubmit={async (data: Formvalues) => {
    //     await axios({
    //       method: "POST",
    //       url: "/api/orders",
    //       data: {
    //         customer,
    //         articles,
    //         address,
    //         valuta,
    //       },
    //     })
    //       .then((res: AxiosResponse) => {
    //         setCustomer("");
    //         setArticles([]);
    //         setAddress("");
    //         setValuta("");
    //         setResult([]), setCustomerName("");
    //         setIsActive(!isActive);
    //       })
    //       .catch((err) => {
    //         // Set error message
    //         console.log(err);
    //       });
    //   }}
    // >
    //   {({ handleSubmit }) => (
    //     <form onSubmit={handleSubmit}>
    //       <Container>
    //         <Row>
    //           <Column responsivity={{ md: 12 }}>
    //             <Customer customersData={customersData} />
    //             <Articles articlesData={articlesData} />
    //           </Column>
    //         </Row>

    //         {!customer && !articles ? (
    //           <></>
    //         ) : (
    //           <Row>
    //             <Column responsivity={{ md: 12 }}>
    //               <Table
    //                 customer={customer}
    //                 valuta={valuta}
    //                 address={address}
    //                 article={articles}
    //               />
    //             </Column>
    //           </Row>
    //         )}

    //         <Button
    //           variant="danger"
    //           type="button"
    //           margin={{ md: { top: 1, right: 1 }, sm: { top: 1, right: 1 } }}
    //           onClick={() => resetOrder()}
    //         >
    //           Resetuj
    //         </Button>

    //         <Button
    //           variant="primary"
    //           type="submit"
    //           margin={{ md: { top: 1 }, sm: { top: 1 } }}
    //         >
    //           Zavrsi
    //         </Button>
    //       </Container>
    //     </form>
    //   )}
    // </Formik>
  );
};

export { index as Dashboard };
