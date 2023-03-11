// Global components
import { Layout } from "@components";

// Global containers
import { Login, Orders } from "@containers";

// Vendors
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// Vendor types
import { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Trebovanja" session={session}>
      <Orders session={session} />
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
