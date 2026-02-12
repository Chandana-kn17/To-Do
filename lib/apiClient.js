import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default apiClient;
