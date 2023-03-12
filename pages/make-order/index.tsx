// Global components
import { Layout } from "@components";

// Global containers
import { Order, Login } from "@containers";

// Global types
import { Article, Customer } from "@types";

// Vendors
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
  articlesData: Article[];
  customersData: Customer[];
}

export default function Page({
  articlesData,
  customersData,
  session,
}: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Dashboard" session={session}>
      <Order {...{ articlesData }} {...{ customersData }} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  // const headers: any = ctx.req.headers;

  const articleResult = await fetch(
    `${process.env.NEXTAUTH_URL}/api/articles`
    // {
    //   headers,
    // }
  );

  const { articlesData } = await articleResult.json();

  const customerResult = await fetch(
    `${process.env.NEXTAUTH_URL}/api/customers`
    // {
    //   headers,
    // }
  );
  const { customersData } = await customerResult.json();

  return {
    props: { articlesData, customersData, session },
  };
};
