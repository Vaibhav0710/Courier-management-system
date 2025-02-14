import axios from "axios";
import httpClient from "../http-common";

export const getAllAvailableOrders = async () => {
  try {
    const token = localStorage.getItem("token"); // Ensure token exists

    const response = await httpClient.get(
      "http://localhost:8080/delivery-agents/getAllAvailableOrders",
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
          Accept: "application/json",
        }, // Necessary for credentials-based access
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const acceptOrder = async (orderId, agentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await httpClient.put(
      `http://localhost:8080/delivery-agents/acceptOrders/${orderId}`,
      agentId, // Send as an object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to accept order:", error);
    throw error;
  }
};


export const getMyDeliveredOrders = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const deliveryAgentID = localStorage.getItem("deliveryAgentID"); // Retrieve agent ID
    const response = await httpClient.get(
      `/delivery-agents/my_DeliveredOrders/${deliveryAgentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivered orders:", error);
    throw error; // Throw error to handle it in the calling function
  }
};

export const deliverTheOrder = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      alert("You are not logged in. Please log in again.");
    } else {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token Payload:", payload);
    }
    // Retrieve the token from localStorage
    const deliveryAgentID = localStorage.getItem("deliveryAgentID"); // Retrieve agent ID
    const response = await axios.put(
      `http://localhost:8080/delivery-agents/completeOrders/${orderId}`,
      {
        agentId: deliveryAgentID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivered orders:", error);
    throw error; // Throw error to handle it in the calling function
  }
};

export const getMyOrders = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const deliveryAgentID = localStorage.getItem("deliveryAgentID");

    const response = await httpClient.get(
      `/delivery-agents/myOrders/${deliveryAgentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const createDeliveryAgent = async (deliveryPartner) => {
  try {
    const response = await httpClient.post(`/delivery-agents`, deliveryPartner);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryPartnerProfile = async (agentId) => {
  const Token = localStorage.getItem("token");
  try {
    const response = await httpClient.get(
      `http://localhost:8080/delivery-agents/${agentId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching delivery partner profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  Update Delivery Partner Profile
export const updateDeliveryPartnerProfile = async (agentId, agentData) => {
  const Token = localStorage.getItem("token");
  try {
    console.log(agentData);
    const response = await httpClient.put(
      `http://localhost:8080/delivery-agents/${agentId}`,
      agentData,
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
      "Error updating delivery partner profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};