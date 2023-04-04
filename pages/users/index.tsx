// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Grid, Layout } from "@components";

// Global ctypes
import { User } from "@types";

// Global containers
import { Login, Users } from "@containers";

// Vendors
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface ContentPageProps {
  session: Session;
  token: any;
}

export default function Page({ session, token }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Komercijalisti" session={session}>
      <Grid
        $apiPath="users"
        $title="Svi komercijalisti"
        $users={true}
        $token={token}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);
  const token = ctx.req.cookies["user"];

  return {
    props: { session, token },
  };
};
