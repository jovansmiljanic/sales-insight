// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { Order } from "@models";

// Global utilities
import { database } from "@utils/server";

// Process request
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Connect to mongoDb database
  await database();

  // Ectract current rquest method
  const { method } = req;

  // Process a GET request
  if (method === "GET") {
    // If user has no access, return an error

    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    // Grab current user
    const orders = await Order.find({}).sort({ createdAt: -1 });

    // Return the object
    return res.send({ orders });
  }

  // Process a POST request
  if (method === "POST") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    const {
      body: { articles, customer, address, valuta },
    } = req;

    // Destructure the session object
    const {
      user: { userName },
    } = session;

    // Create user model object
    const orders = new Order({
      owner: userName,
      customer,
      articles,
      address,
      valuta,
    });

    // Store user on the Database
    await orders.save();

    // Return the created user
    return res.send(orders);
  }

  // End request
  return res.end();
};

export default api;
