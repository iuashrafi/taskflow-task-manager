import { BACKEND_URL } from "../config";
const fetchAPI = async (url, options = {}) => {
  const baseURL = `${BACKEND_URL}/api`;
  const defaultOptions = {
    credentials: "include", // Include credentials - cookies, ssl certificates, http authentication etc
    headers: {
      "Content-Type": "application/json",
    },
  };
  const requestOptions = {
    ...defaultOptions,
    ...options,
  };
  try {
    const response = await fetch(baseURL + url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};

export default fetchAPI;
