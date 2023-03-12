// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";

// Models
import { User } from "@models";

// Global utilities
import { database } from "@utils/server";

// Vendors
import bcrypt from "bcryptjs";

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
                fullName: val
                  ? {
                      $regex: new RegExp(val.toString(), "i"),
                    }
                  : "",
              };

            case "role":
              const role = val?.toString().split(",");
              return { ...p, [key]: role?.map((role) => role) };

            default:
              return { ...p, [key]: val };
          }
        },
        {} // Start
      );
    };

    const length = await User.find({
      ...getQuery(query),
    })
      .sort({ createdAt: -1 })
      .count();

    // return res.send({ customersData });
    const users = await User.find({
      ...getQuery(query),
    })
      .skip(Number(skip) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Return the object
    return res.send({ items: users, length });
  }

  // Process a POST request
  if (method === "POST") {
    const {
      body: { fullName, email, userName, password },
    } = req;

    const isUserNameTaken = Boolean(await User.findOne({ userName }));

    if (isUserNameTaken) {
      res.statusMessage = "User name is already used";
      return res.status(409).end();
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    // Create user model object
    const user = new User({
      fullName,
      email,
      userName,
      password: encryptedPassword,
      role: 2,
    });

    // Store user on the Database
    await user.save();

    // Return the created user
    return res.send(user);
  }

  // Process a GET request
  if (method === "DELETE") {
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    const { body } = req;

    // Grab current user
    await User.deleteOne({ _id: body });
  }

  // End request
  return res.end();
};

export default api;
