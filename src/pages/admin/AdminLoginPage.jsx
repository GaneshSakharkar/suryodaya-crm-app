import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin, loginAdmin } from "../../api/apiData";
import { addUser } from "../../redux/slice/UserSlice";
import { encryptData } from "../../security/Encryption";

export const AdminLoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const [loginReq, setLoginReq] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginReq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserProfile = async (jwt) => {
    try {
      const res = await getAdmin(jwt);
      dispatch(addUser(encryptData(res.data.data)));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getLogin = async () => {
    try {
      const res = await loginAdmin(loginReq);

      if (res?.data?.token) {
        const token = res.data.token;

        // Store the token
        localStorage.setItem("admin_jwt", token);
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("admin_jwt")
        );

        alert("Login Successful");
        setLoginReq({ email: "", password: "" });

        // Fetch user profile
        await fetchUserProfile(token);

        // Navigate to admin profile
        navigate("/admin/dashboard");
      } else {
        throw new Error("Token not received.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
      setLoginReq({ email: "", password: "" });
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  // Clear manager token before admin login
  localStorage.removeItem("manager_jwt");

  const jwt = localStorage.getItem("admin_jwt");
  if (jwt) {
    alert("You are already logged in! Logout first.");
    setLoginReq({ email: "", password: "" });
    return navigate("/");
  }

  getLogin();
};


  return (
    <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20"></div>

      {/* Form Content */}
      <div className="z-10 w-full max-w-md rounded-lg bg-white shadow-md p-8">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
          Admin Sign In
        </Typography>
        <Typography className="mb-10 text-gray-600 font-normal text-center">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              value={loginReq.email}
              onChange={handleInputChange}
              placeholder="name@mail.com"
              className="w-full focus:border-t-black"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="relative">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              value={loginReq.password}
              name="password"
              onChange={handleInputChange}
              className="w-full border-t-gray-400 focus:border-t-black"
              type={passwordShown ? "text" : "password"}
            />
            <i
              onClick={togglePasswordVisibility}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {passwordShown ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </i>
          </div>
          <Button
            className="bg-gray-900 hover:bg-gray-950"
            size="lg"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:text-blue-500">
              Forgot password?
            </a>
            {/* <NavLink
              to="/admin-register"
              className="hover:text-blue-500 font-medium"
            >
              Create account
            </NavLink> */}
          </div>
        </form>
      </div>
    </section>
  );
};
