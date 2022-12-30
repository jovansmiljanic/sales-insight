// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Layout } from "@components";

// Global types
import { Order as Ordertype } from "@types";

// Global containers
import { Login, Order } from "@containers";

// Vendors
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface ContentPageProps {
  order: Ordertype;
  session: Session;
}

export default function Page({ order, session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title={`Trebovanje: ${order._id}`}>
      <Order {...{ order }} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  const orderResult = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`);
  const { orders } = await orderResult.json();

  // Pass data to the page via props
  const order = orders.find(({ _id }: any) => _id === ctx.params?.orderId);

  return {
    props: { order, session },
  };
};
