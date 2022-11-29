// Vendor types
import { GetServerSideProps } from "next";

// GLobal components
import { Layout } from "@components";

// Global ctypes
import { User } from "@types";

// Global containers
import { Users } from "@containers";

interface ContentPageProps {
  users: User[];
}

export default function Page({ users }: ContentPageProps) {
  return (
    <Layout title="Komercijalisti">
      <Users {...{ users }} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userResult = await fetch(
    `${process.env.NEXTAUTH_URL}/api/registration`
  );
  const { users } = await userResult.json();

  return {
    props: { users },
  };
};
