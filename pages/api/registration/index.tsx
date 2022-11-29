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
    // Grab current user
    const users = await User.find({});

    // Return the object
    return res.send({ users });
  }

  // Process a POST request
  if (method === "POST") {
    const {
      body: { userName, password },
    } = req;

    const isUserNameTaken = Boolean(await User.findOne({ userName }));

    if (isUserNameTaken) {
      res.statusMessage = "User name is already used";
      return res.status(409).end();
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    // Create user model object
    const user = new User({
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
    console.log(body);

    // Grab current user
    await User.deleteOne({ _id: body });
  }

  // End request
  return res.end();
};

export default api;
