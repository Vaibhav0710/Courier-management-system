import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Auths/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth(); // Get user data from Auth Context
    const location = useLocation();

    console.log("Current Path:", location.pathname);
    console.log("Logged in User:", user);

    // Determine where to redirect if user is not logged in
    const getRedirectPath = () => {
        if (location.pathname.startsWith("/user")) return "/user";
        if (location.pathname.startsWith("/delivery")) return "/delivery";
        if (location.pathname.startsWith("/admin")) return "/admin";
        return "/user"; // Default: Send to user login
    };

    // If no user is logged in, redirect to the correct login page
    if (!user) {
        console.warn("User not logged in, redirecting to respective login page.");
        return <Navigate to={getRedirectPath()} replace />;
    }

    return <Outlet />; // Allow access if user is logged in
};

export default ProtectedRoute;
