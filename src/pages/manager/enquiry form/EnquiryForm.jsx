import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCources, sendEnquiryForm } from "../../../api/apiData";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import SourceCheckboxGroup from "./SourceCheckboxGroup";

export const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "",
    courses: [], // Store full course objects
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: "",
    qualification: "",
    courses: "",
  });

  const [otherQualification, setOtherQualification] = useState("");

  const navigate = useNavigate();

  const getAllCources = async () => {
    try {
      const res = await getCources();
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const { data } = useQuery({
    queryKey: ["cources"],
    queryFn: getAllCources,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "courses") {
      const selectedCourse = data.find((course) => course.courseName === value); // Find the full course object

      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          courses: [...prevState.courses, selectedCourse], // Add the full course object
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          courses: prevState.courses.filter(
            (course) => course.courseName !== value // Remove the course by its name
          ),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Real-time validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        break;
      case "contact":
        if (!value) {
          error = "Contact number is required.";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Contact number must be 10 digits.";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "college":
        if (!value) error = "College name is required.";
        break;
      case "branch":
        if (!value) error = "Branch is required.";
        break;
      case "source":
        if (value.length === 0)
          error = "Please select how you found out about us.";
        break;
      case "qualification":
        if (!value) error = "Please select your qualification.";
        break;
      case "courses":
        if (value.length === 0) error = "Please select at least one course.";
        break;
      default:
        break;
    }
    return error;
  };

  const jwt = localStorage.getItem("manager_jwt");

  const submitEnquiryReq = async (formReq) => {
    try {
      const res = await sendEnquiryForm(jwt, formReq);
      return alert(res?.data?.message);
    } catch (error) {
      console.log(error);
      return alert("Error submitting form: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalErrors = Object.keys(formData).reduce((acc, field) => {
      acc[field] = validateField(field, formData[field]);
      return acc;
    }, {});

    if (Object.values(finalErrors).every((error) => error === "")) {
      // Exclude `id` from the courses before submitting
      const coursesWithoutId = formData.courses.map((course) => {
        const { id, ...courseWithoutId } = course; // Destructure to exclude id
        return courseWithoutId; // Return the rest of the course object
      });

      const submissionData = {
        ...formData,
        courses: coursesWithoutId, // Use courses without the id
        qualification:
          formData.qualification === "Others" && otherQualification
            ? otherQualification
            : formData.qualification,
        source: formData.source.join(", "),
      };

      console.log(submissionData); // You should see the courses without the id here

      submitEnquiryReq(submissionData);

      setFormData({
        name: "",
        contact: "",
        email: "",
        college: "",
        branch: "",
        source: [],
        qualification: "",
        courses: [],
      });
      setOtherQualification("");
      navigate("/manager/enquiries");
    } else {
      setErrors(finalErrors);
    }
  };

  return (
    <div className="w-full max-w-[95%] mt-10 mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold ">Enquiry Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="font-semibold mb-4 text-lg">Personal Details</h2>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          label="Contact No."
          name="contact"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
        />
        <InputField
          label="Email ID"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="College"
          name="college"
          value={formData.college}
          onChange={handleChange}
          error={errors.college}
        />
        <InputField
          label="Branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          error={errors.branch}
        />
        <SourceCheckboxGroup
          options={[
            "Google Search",
            "Reference",
            "Newspaper",
            "Seminar",
            "Poster",
            "Hoarding",
            "Others",
          ]}
          selectedValues={formData.source}
          onChange={handleChange}
          error={errors.source}
        />

        <RadioGroup
          options={["BE", "BCA", "MCA", "Others"]}
          selectedValue={formData.qualification}
          onChange={handleChange}
          error={errors.qualification}
        />

        {formData.qualification === "Others" && (
          <InputField
            label="Specify Other Qualification"
            value={otherQualification}
            onChange={(e) => setOtherQualification(e.target.value)}
          />
        )}
        <CheckboxGroup
          label="Courses Registered For"
          options={data?.length ? data : []} // Pass the full course objects
          selectedValues={formData.courses}
          onChange={handleChange}
          error={errors.courses}
        />

        <div className="text-center">
          <button
            type="submit"
            className="mt-2 bg-gray-900 text-md text-white py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
