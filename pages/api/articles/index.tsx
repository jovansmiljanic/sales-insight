// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Process request
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Ectract current rquest method
  const { method } = req;

  // // Process a GET request
  // if (method === "GET") {
  //   // Grab current user
  //   const articlesData = await Article.find({});

  //   // Return the object
  //   return res.send({ articlesData });
  // }

  // // Process a POST request
  // if (method === "POST") {
  //   // If user has no access, return an error
  //   if (!session) {
  //     return res
  //       .status(401)
  //       .send({ error: "Please login to perform the action." });
  //   }

  //   const { body } = req;

  //   // Create user model object
  //   const article = new Article({
  //     ...body,
  //   });

  //   // Store user on the Database
  //   await article.save();

  //   // Return the created user
  //   return res.send(article);
  // }

  // End request
  return res.end();
};

export default api;
