import httpClient from "../http-common";

export const loginCustomer = async (credentials) => {
  try {
    const response = await httpClient.post("/customers/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.response?.data || "Login failed. Please try again.");
  }
};

export const createTruckOrder = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");
  try {
    const response = await httpClient.post("/customers/BookForTruck", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }); // Using relative path
    return response.data;
  } catch (error) {
    console.error("Error while creating truck order:", error);
  }
};

export const createTwoWheelerOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");

  try {
    const response = await httpClient.post(
      "http://localhost:8080/customers/BookForBike",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while creating two-wheeler order:", error);
    throw error;
  }
};

export const createCustomer = async (data) => {
  try {
    // Sending a POST request to add a new customer
    const response = await httpClient.post("/customers", data,);
    return response.data; // Returning the response data, which could include the newly created customer
  } catch (error) {
    console.error("Error creating customer:", error);
    // You can throw an error or handle it in any way that fits your needs
    throw error;
  }
};

// In user.service.js
export const getAllOrders = async (customerId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");
  try {
    const response = await httpClient.get(
      `/customers/getAllMyOrders/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ); // Pass customerId
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get User Profile
export const getCustomerProfile = async (customerId) => {
  const Token = localStorage.getItem("token");
  try {
    const response = await httpClient.get(
      `http://localhost:8080/customers/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  Update User Profile
export const updateCustomerProfile = async (customerId, customerData) => {
  const Token = localStorage.getItem("token");
  try {
    console.log(customerData);
    const response = await httpClient.put(
      `/customers/${customerId}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};
