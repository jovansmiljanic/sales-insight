// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Layout } from "@components";

// Global types
import { Order } from "@types";

// Global containers
import { Orders } from "@containers";

interface ContentPageProps {
  orders: Order[];
}

export default function Page({ orders }: ContentPageProps) {
  return (
    <Layout title="Orders">
      <Orders {...{ orders }} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const orderResult = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`);
  const { orders } = await orderResult.json();

  return {
    props: { orders },
  };
};
