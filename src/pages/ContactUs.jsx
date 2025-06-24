import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { getRegistrations } from "../api/apiData";
import { useQuery } from "@tanstack/react-query";

export const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setIsSubmitted(true);
      setErrors({});
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } else {
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  return (
    <section className="px-8 py-8 lg:py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          Customer Care
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Whether it&apos;s a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src="./src/img/contact.png"
            alt="contact illustration"
            className="mx-auto h-auto lg:max-h-[510px]"
          />
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 lg:max-w-sm mx-auto w-full"
            >
              <div className="w-full">
                <Typography className="mb-2 text-left font-medium !text-gray-900">
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="focus:border-t-gray-900"
                />
                {errors.firstName && (
                  <Typography className="text-sm text-red-500">
                    {errors.firstName}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography className="mb-2 text-left font-medium !text-gray-900">
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="focus:border-t-gray-900"
                />
                {errors.lastName && (
                  <Typography className="text-sm text-red-500">
                    {errors.lastName}
                  </Typography>
                )}
              </div>

              <div className="w-full">
                <Typography className="mb-2 text-left font-medium !text-gray-900">
                  Your Email
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="name@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="focus:border-t-gray-900 w-full"
                />
                {errors.email && (
                  <Typography className="text-sm text-red-500">
                    {errors.email}
                  </Typography>
                )}
              </div>

              <div>
                <Typography className="mb-2 text-left font-medium !text-gray-900">
                  Your Message
                </Typography>
                <Textarea
                  rows={6}
                  color="gray"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="focus:border-t-gray-900"
                />
                {errors.message && (
                  <Typography className="text-sm text-red-500">
                    {errors.message}
                  </Typography>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-950"
              >
                Send message
              </Button>
              {isSubmitted && (
                <Typography className="text-sm text-green-500 mt-4">
                  Your message has been sent successfully! We will get back to
                  you soon.
                </Typography>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
