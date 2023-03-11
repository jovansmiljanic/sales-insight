// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { Customer } from "@models";

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
    const {
      query: { limit, skip, ...query },
    } = req;

    // Restructure query based on Collection schema
    const getQuery = (query: {
      [x: string]: string | string[] | undefined;
    }) => {
      return Object.entries(query).reduce(
        (p, [key, val]) => {
          switch (key) {
            case "searchQuery":
              return {
                ...p,
                name: val
                  ? {
                      $regex: new RegExp(val.toString(), "i"),
                    }
                  : "",
              };

            case "type":
              const types = val?.toString().split(",");
              return { ...p, [key]: types?.map((type) => type) };

            case "topic":
              const topics = val?.toString().split(",");
              return { ...p, [key]: topics?.map((topic) => topic) };

            default:
              return { ...p, [key]: val };
          }
        },
        {} // Start
      );
    };

    const length = await Customer.find({
      ...getQuery(query),
    })
      .sort({ createdAt: -1 })
      .count();

    // return res.send({ customersData });
    const customers = await Customer.find({
      ...getQuery(query),
    })
      .skip(Number(skip) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Return the object
    return res.send({ items: customers, length });
  }

  // Process a POST request
  if (method === "POST") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    const { body } = req;

    // Create user model object
    const customer = new Customer({
      ...body,
    });

    // Store user on the Database
    await customer.save();

    // Return the created user
    return res.send(customer);
  }

  // End request
  return res.end();
};

export default api;
