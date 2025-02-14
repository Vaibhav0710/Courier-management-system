import axios from 'axios';

const httpClient = axios.create({
    baseURL: "http://localhost:8080", // Ensure this matches your backend URL
    headers: {
        "Content-Type": "application/json",
    }, // Add this if using authentication cookies
});

export default httpClient;
