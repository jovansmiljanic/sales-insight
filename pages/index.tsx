// Global components
import { Layout } from "@components";

// Global containers
import { AllOrders, Login } from "@containers";

// Vendors
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

interface ContentPageProps {
  session: Session;
  token: any;
}

export default function Page({ session, token }: ContentPageProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await axios({
      method: "DELETE",
      url: "http://localhost:8000/api/v1/auth",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res: AxiosResponse) => {
        document.cookie =
          "user" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        signOut();

        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!session) return <Login />;

  return (
    <Layout title="Sva trebovanja" session={session}>
      <div>Heeelo from user</div>

      <button onClick={handleSignOut}>Logout</button>
      {/* <AllOrders /> */}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);
  const token = ctx.req.cookies["user"] ? ctx.req.cookies["user"] : "";

  return {
    props: { session, token },
  };
};
