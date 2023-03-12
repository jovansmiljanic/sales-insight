// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Layout } from "@components";

// Global ctypes
import { User } from "@types";

// Global containers
import { Login, Users } from "@containers";

// Vendors
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Komercijalisti" session={session}>
      <Users />
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
