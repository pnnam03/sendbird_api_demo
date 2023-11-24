import { SENDBIRD_API_TOKEN } from "./env.js";

const fetcher = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SENDBIRD_API_TOKEN,
      },
      body: method === 'POST' ? JSON.stringify(data) : null,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return { status: "An error occured!" };
  }
};

export default fetcher;
