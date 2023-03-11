// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Layout } from "@components";

// Global types
import { Order } from "@types";

// Global containers
import { Login, Orders } from "@containers";

// Vendors
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface ContentPageProps {
  orders: Order[];
  session?: Session;
}

export default function Page({ orders, session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Orders" session={session}>
      {/* <Orders {...{ orders }} /> */}
      orders
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  const orderResult = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`);
  const { orders } = await orderResult.json();

  return {
    props: { orders, session },
  };
};
