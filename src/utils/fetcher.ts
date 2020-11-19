import fetch from "isomorphic-fetch";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BaseUrl = process.env.NODE_ENV === "test" ? "http://localhost:3000" : "";

export const fetcher = async (url: string, id: string) => {
  // await sleep(2000);

  const data = await fetch(`${BaseUrl}${url}/${id}`);

  const response = await data.json();

  return response;
};
