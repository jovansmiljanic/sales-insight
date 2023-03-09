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
  users: User[];
  session: Session;
}

export default function Page({ users, session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Komercijalisti" session={session}>
      <Users {...{ users }} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  const userResult = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
  const { users } = await userResult.json();

  return {
    props: { users, session },
  };
};
