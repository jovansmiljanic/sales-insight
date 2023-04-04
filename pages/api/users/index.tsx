// Core
import { getSession } from "next-auth/react";

// NextJS Types
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

// Process request
const api = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Ectract current rquest method
  const { method } = req;

  //   // Process a GET request
  if (method === "GET") {
    // const { user } = req.cookies;

    const response = await fetch("http://localhost:8000/api/v1/users");
    // const data = await response.json();

    return res.send(response);
  }

  //   // Process a POST request
  //   if (method === "POST") {
  //     const {
  //       body: { fullName, email, userName, password },
  //     } = req;

  //     const isUserNameTaken = Boolean(await User.findOne({ userName }));

  //     if (isUserNameTaken) {
  //       res.statusMessage = "User name is already used";
  //       return res.status(409).end();
  //     }

  //     const encryptedPassword = await bcrypt.hash(password, 8);

  //     // Create user model object
  //     const user = new User({
  //       fullName,
  //       email,
  //       userName,
  //       password: encryptedPassword,
  //       role: 2,
  //     });

  //     // Store user on the Database
  //     await user.save();

  //     // Return the created user
  //     return res.send(user);
  //   }

  // End request
  return res.end();
};

export default api;
