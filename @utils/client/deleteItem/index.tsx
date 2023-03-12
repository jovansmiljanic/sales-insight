import axios, { AxiosResponse } from "axios";

export const deleteItem = async (id: any, router: any) => {
  await axios({
    method: "DELETE",
    url: "/api/orders",
    data: id,
  })
    .then((res: AxiosResponse) => {
      router.push(router.asPath);
    })
    .catch(({ response }) => {
      // Set error message
      console.log(response?.statusText);
    });
};
