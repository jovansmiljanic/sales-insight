// Global components
import { Layout } from "@components";

// Global containers
import { Login, Orders } from "@containers";

// Global types
import { Order } from "@types";

// Vendors
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface ContentPageProps {
  orders: Order[];
  session: Session;
}

export default function Page({ orders, session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Trebovanja">
      <Orders orders={orders} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  const orderResult = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`);
  const { orders } = await orderResult.json();

  const finalOrders = orders.filter(
    (order: Order) => order.owner === session?.user.userName
  );

  return {
    props: { orders: finalOrders, session },
  };
};
