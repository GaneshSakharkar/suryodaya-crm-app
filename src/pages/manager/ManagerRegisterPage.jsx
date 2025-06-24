import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerManager } from "../../api/apiData";

export const ManagerRegisterPage = () => {
  const [registerReq, setRegisterReq] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterReq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTermsChange = () => {
    setTermsAccepted((prev) => !prev);
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!registerReq.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!registerReq.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerReq.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!registerReq.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(registerReq.contact)) {
      newErrors.contact = "Invalid contact number, must be 10 digits";
    }

    if (!registerReq.password) {
      newErrors.password = "Password is required";
    } else if (registerReq.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (registerReq.confirmPassword !== registerReq.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!termsAccepted) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRegister = async () => {
    try {
      const res = await registerManager(registerReq);
      alert("Register successfully");
      setRegisterReq({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("Already have an account! Please login.");
      setRegisterReq({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      getRegister();
      navigate("/manager-login");
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full blur-2xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-50"></div>

      <Card
        color="transparent"
        shadow={false}
        className="z-10 w-full flex justify-center items-center sm:w-96 md:w-2/3 lg:w-1/3 lg:max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow-xl"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Manager Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-full sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-4">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                name="name"
                value={registerReq.name}
                onChange={handleInputChange}
                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.name}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                name="email"
                value={registerReq.email}
                onChange={handleInputChange}
                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Contact Number
              </Typography>
              <Input
                size="lg"
                placeholder="1234567890"
                name="contact"
                value={registerReq.contact}
                onChange={handleInputChange}
                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                  errors.contact ? "border-red-500" : ""
                }`}
              />
              {errors.contact && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.contact}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="password"
                value={registerReq.password}
                onChange={handleInputChange}
                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.password}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="confirmPassword"
                value={registerReq.confirmPassword}
                onChange={handleInputChange}
                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <Typography color="red" className="text-sm mt-1">
                  {errors.confirmPassword}
                </Typography>
              )}
            </div>
          </div>

          <div>
            <Checkbox
              checked={termsAccepted}
              onChange={handleTermsChange}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            {errors.terms && (
              <Typography color="red" className="text-sm mt-1">
                {errors.terms}
              </Typography>
            )}
          </div>

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            disabled={!termsAccepted}
          >
            Sign Up
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <NavLink to="/manager-login" className="font-medium text-gray-900">
              Sign In
            </NavLink>
          </Typography>
        </form>
      </Card>
    </section>
  );
};
