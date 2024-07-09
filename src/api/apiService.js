import axios from "axios";

const apiService = axios.create({
  // You can set up common configuration here, like baseURL, etc.
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve your authentication token from wherever it's stored

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchData = async (url, data = null, method = "POST") => {
  try {
    const response = await apiService({
      method,
      url,
      data: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
