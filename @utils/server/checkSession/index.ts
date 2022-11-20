// Core
import { getSession } from "next-auth/react";

export const checkSession = async ({
  context,
  role,
  callback,
}: {
  context: any;
  role?: number[];
  callback?: Function;
}) => {
  // Wait to get the session if user is logged in
  const session = await getSession(context);

  // Grab session url without query
  const [resolvedUrl] = context.resolvedUrl.split("?");

  const cancelRoute =
    resolvedUrl === "/orders"
      ? {
          props: {
            session,
          },
        }
      : {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };

  // If we don't have a user, return to Dashboard (Login for no user)
  if (!session) {
    return cancelRoute;
  }

  // Check if User role is allowed to view the route
  if (session) {
    return cancelRoute;
  }

  // If we need to fetch some data on the back-end, we use a Callback function when the user authentication has passed
  const data = callback ? await callback(session) : "";

  return {
    props: { session, ...data },
  };
};
