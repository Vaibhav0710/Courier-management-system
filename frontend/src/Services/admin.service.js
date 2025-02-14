import axios from "axios";

export const getAllCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    // Check if token exists
    if (!token) {
      console.error("No token found. Redirecting to login...");
      throw new Error("No token found. Please log in again.");
    }
    const response = await axios.get("http://localhost:8080/admin/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching customers:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error for further handling
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8080/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
      },
    });
    if (response && response.data) {
      console.log("API Response Data:", response.data);
      return response.data; // Return the API data
    } else {
      console.error("Invalid response format:", response);
      return []; // Return an empty array as a fallback
    }
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error for further handling
  }
};

export const acceptPayment = async (orderId) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(
      `http://localhost:8080/admin/orders/${orderId}`,
      {}, // Include an empty body if needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting payment:", error);
    throw error;
  }
};

export const getAllAgents = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");
  try {
    const response = await axios.get("http://localhost:8080/admin/agents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response; // Ensure this returns the correct format
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
};


export const deleteAgent = async (deleteAgentId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");

  try {
    const response = await axios.delete(
      `http://localhost:8080/admin/agents/${deleteAgentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response; // Ensure this returns the correct format
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
};
