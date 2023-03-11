// Global components
import { Layout } from "@components";

// Global containers
import { Dashboard, Login } from "@containers";

// Vendors
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Sva trebovanja" session={session}>
      <Dashboard />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  return {
    props: { session },
  };
};
