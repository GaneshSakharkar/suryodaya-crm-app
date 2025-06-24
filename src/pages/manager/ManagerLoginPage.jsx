import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getManager, loginManager } from "../../api/apiData";
import { addUser } from "../../redux/slice/UserSlice";
import { encryptData } from "../../security/Encryption";

export const ManagerLoginPage = () => {
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
      const res = await getManager(jwt);
      dispatch(addUser(encryptData(res.data.data)));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getLogin = async () => {
    try {
      const res = await loginManager(loginReq);

      if (res?.data?.token) {
        const token = res.data.token;

        // Store the token
        localStorage.setItem("manager_jwt", token);
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("manager_jwt")
        );

        alert("Login Successful");
        setLoginReq({ email: "", password: "" });

        // Fetch user profile
        await fetchUserProfile(token);

        // Navigate to manager profile
        navigate("/manager/dashboard");
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

  // Clear admin token before manager login
  localStorage.removeItem("admin_jwt");

  const jwt = localStorage.getItem("manager_jwt");
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
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full blur-2xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-50"></div>

      {/* Form Content */}
      <div className="z-10 w-full max-w-md rounded-lg bg-transparent shadow-xl p-8 border border-gray-200">
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-4 text-center font-semibold text-gray-800"
        >
          Manager Sign In
        </Typography>
        <Typography className="mb-8 text-gray-700 text-center font-medium text-lg">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-700"
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
              className="w-full placeholder:opacity-90 focus:border-t-gray-600 border-t-gray-300"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="relative mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-700"
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
              className="w-full placeholder:opacity-90 focus:border-t-gray-600 border-t-gray-300"
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
            color="blue-gray"
            size="lg"
            type="submit"
            className="mt-6 bg-gray-900 text-gray-100 hover:bg-gray-950"
            fullWidth
          >
            Sign In
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium text-gray-700"
            >
              Forgot password?
            </Typography>
          </div>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <NavLink
              to="/manager-register"
              className="font-medium text-gray-900"
            >
              Create account
            </NavLink>
          </Typography>
        </form>
      </div>
    </section>
  );
};
