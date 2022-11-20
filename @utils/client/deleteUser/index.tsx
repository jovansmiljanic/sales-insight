// Vendors
import mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";

// NextJS
import { useRouter } from "next/router";

export const deleteUser = async (_id: mongoose.Types.ObjectId) => {
  const router = useRouter();
  await axios({
    method: "DELETE",
    url: "/api/registration",
    data: _id,
  })
    .then((res: AxiosResponse) => {
      router.push("/orders");
    })
    .catch(({ response }) => {
      // Set error message
      console.log(response?.statusText);
    });
};
