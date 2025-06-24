import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decryptData } from "../security/Encryption";
import Loader from "../features/Loader";
import { Navigate, Outlet } from "react-router-dom";
import { getAdmin, getManager } from "../api/apiData";
import { Sidebar } from "../components/ui/AdminSidebar";

export const AdminProtectedRoute = () => {
  const jwtToken = localStorage.getItem("admin_jwt");
  const [user1, setUser1] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // For loading state

  const data = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    const initializeUser = async () => {
      if (!jwtToken || !data) {
        setIsLoading(false); // No token or data, no need to fetch
        return;
      }

      try {
        const decryptedUser = decryptData(data);
        setUser1(decryptedUser);

        // Fetch user data based on role
        let res = null;
        if (decryptedUser.role === "ADMIN") {
          res = await getAdmin(jwtToken);
        } else if (decryptedUser.role === "MANAGER") {
          res = await getManager(jwtToken);
        }

        if (res) {
          // console.log(res);
          setUser1(res.data.data); // Update with fetched user data
        } else {
          setUser1(null); // Invalid response
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser1(null); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Done loading
      }
    };

    initializeUser();
  }, [jwtToken, data]); // Dependency on token and user data

  // Show loading indicator while fetching user data
  if (isLoading) return <Loader />;

  // console.log(user1);

  // If user is not authenticated, redirect to login
  if (!user1) {
    localStorage.removeItem("jwt");
    return <Navigate to="/admin-login" replace={true} />;
  }

  // Handle role-based routing
  if (user1.role === "ADMIN") {
    return (
      <section className="flex gap-2">
        <Sidebar user={user1} />
        <div className="w-full min-h-lvh">
          <Outlet />
        </div>
      </section>
    );
  }

  // Default redirect for non-USER roles
  return <Navigate to="/" replace={true} />;
};
