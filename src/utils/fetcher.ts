import fetch from "isomorphic-fetch";

const BaseUrl = process.env.NODE_ENV === "test" ? "http://localhost:3000" : "";

export const fetcher = async (url: string, id: string) => {
  const data = await fetch(`${BaseUrl}${url}/${id}`);

  const response = await data.json();

  return response;
};
