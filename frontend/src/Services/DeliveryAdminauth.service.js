import httpClient from "../http-common"; // Import Axios instance

export const adminLogin = async (credentials) => {
  try {
    const response = await httpClient.post("/admin/login", credentials);
    console.log("Admin login success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Admin login error:",
      error.response?.status,
      error.response?.data
    );
    return null; // Return null instead of throwing an error
  }
};

export const loginDeliveryPartner = async ({ email, password }) => {
  try {
    console.log("Sending request to login API:", { email, password });

    const response = await httpClient.post(
      "http://localhost:8080/delivery-agents/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }, // If using cookies for authentication
        validateStatus: (status) => status < 500, // Prevent automatic Axios error
      }
    );

    console.log("Full API Response:", response);
    console.log("API Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      throw new Error("Invalid username or password.");
    }

    throw new Error("An error occurred. Please try again.");
  }
};
