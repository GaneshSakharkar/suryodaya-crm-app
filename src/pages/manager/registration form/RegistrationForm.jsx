import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, radio } from "@material-tailwind/react";
import { getCources, sendRegistrationForm } from "../../../api/apiData";
import PersonalDetails from "./PersonalDetails";
import QualificationDetails from "./QualificationDetails";
import CheckboxGroup from "./CheckboxGroup";
import PaymentDetails from "./PaymentDetails";
import SourceCheckboxGroup from "../enquiry form/SourceCheckboxGroup";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "",
    otherQualification: "",
    registeredCourses: [],
    totalFees: 0,
    amountPaid: "",
    paymentType: "",
    installmentMonths: 0, // Corrected here
    installments: 0,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isInstallment, setIsInstallment] = useState(false);
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentTypes = ["CASH", "CHEQUE", "ONLINE", "INSTALLMENT"];

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const res = await getCources();
        return res?.data?.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSizeInBytes = 600 * 1024; // 600KB in bytes
      if (file.size > maxSizeInBytes) {
        setErrorMessage(
          "File size exceeds 600KB. Please upload a smaller image."
        );
        setImage(null); // Reset the image
      } else {
        setErrorMessage(""); // Clear error message
        setImage(file); // Set the image if it meets the size criteria
      }
    }
  };

  // Calculate Installments
  useEffect(() => {
    if (
      formData.totalFees > 0 &&
      formData.amountPaid >= 0 &&
      formData.installmentMonths > 0 // Corrected here
    ) {
      const remainingAmount =
        parseFloat(formData.totalFees) - parseFloat(formData.amountPaid);
      const installmentAmount =
        remainingAmount > 0
          ? (remainingAmount / formData.installmentMonths).toFixed(2) // Corrected here
          : 0;
      setFormData((prevState) => ({
        ...prevState,
        installments: installmentAmount,
      }));
    }
  }, [formData.totalFees, formData.amountPaid, formData.installmentMonths]); // Corrected here

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => {
      let updatedState = { ...prevState };

      // Handle radio input for payment type
      if (type === "radio" && name === "paymentType") {
        updatedState.paymentType = value;

        // Update isInstallment based on payment type
        setIsInstallment(value.toUpperCase() === "INSTALLMENT");

        // Reset installment-related fields if payment type is not "INSTALLMENT"
        if (value.toUpperCase() !== "INSTALLMENT") {
          updatedState.installmentMonths = 0;
          updatedState.installments = 0;
        }
      }
      // Handle checkbox inputs
      else if (type === "checkbox" && name === "source") {
        updatedState.source = checked
          ? [...prevState.source, value]
          : prevState.source.filter((item) => item !== value);
      }
      // Handle other input types
      else {
        updatedState[name] = value;
      }

      validateField(name, value); // Inline validation

      return updatedState;
    });
  };

  // Real-time validation function
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "amountPaid" && isNaN(value)) {
      newErrors.amountPaid = "Amount paid should be a valid number.";
    } else if (name === "installmentMonths" && isInstallment && isNaN(value)) {
      newErrors.installmentMonths =
        "Installment months should be a valid number.";
    } else if (name === "totalFees" && isNaN(value)) {
      newErrors.totalFees = "Total fees should be a valid number.";
    } else if (name === "paymentType" && !value) {
      newErrors.paymentType = "Payment Type is required.";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const course = data?.find((course) => course.courseName === value);
    if (course) {
      setFormData((prevState) => {
        const updatedCourses = checked
          ? [...prevState.registeredCourses, course] // Add course to registeredCourses
          : prevState.registeredCourses.filter(
              (item) => item.courseName !== course.courseName // Remove course
            );
        const totalFees = updatedCourses.reduce(
          (total, course) => total + course.price,
          0
        );
        return {
          ...prevState,
          registeredCourses: updatedCourses, // Update registeredCourses
          totalFees: totalFees, // Update total fees
        };
      });

      // Clear error for registeredCourses when a course is selected
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.registeredCourses; // Remove error for registeredCourses
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(false);

    // Perform final validation before submission
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Contact number should be 10 digits.";
    if (!formData.college.trim())
      newErrors.college = "College name is required.";
    if (!formData.branch.trim()) newErrors.branch = "Branch name is required.";

    // Validate amountPaid based on payment type
    if (!formData.amountPaid || isNaN(formData.amountPaid)) {
      newErrors.amountPaid = "Amount paid should be a valid number.";
    } else if (
      formData.paymentType !== "INSTALLMENT" &&
      parseInt(formData.amountPaid) !== formData.totalFees
    ) {
      newErrors.amountPaid =
        "Amount paid should be equal to total fees for non-installment payment.";
    }

    if (!formData.totalFees || isNaN(formData.totalFees))
      newErrors.totalFees = "Total fees should be a valid number.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";

    // Installment validation should only occur if INSTALLMENT is selected
    if (formData.paymentType === "INSTALLMENT") {
      if (!formData.installmentMonths || isNaN(formData.installmentMonths))
        newErrors.installmentMonths =
          "Installment months should be a valid number.";
    }

    // Check if at least one course is selected
    if (formData.registeredCourses.length === 0)
      newErrors.registeredCourses = "At least one course must be selected.";

    // Validate if at least one source is selected
    if (formData.source.length === 0) {
      newErrors.source = "At least one source must be selected.";
    }

    // Validate payment type
    if (!formData.paymentType)
      newErrors.paymentType = "Payment type is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if errors exist
    }

    if (!image) {
      setErrorMessage("Please upload an image.");
      return;
    }

    // Form submission logic
    const submissionData = {
      ...formData,
      source: formData.source.join(", "), // Convert array to comma-separated string
      qualification:
        formData.qualification === "Others"
          ? formData.otherQualification
          : formData.qualification,
      registeredCourses: formData.registeredCourses.map((course) => {
        const { id, ...courseWithoutId } = course; // Exclude 'id'
        return courseWithoutId; // Return the course without 'id'
      }),
      installmentsMonths: formData.installmentMonths, // Rename the field here
    };

    delete submissionData.otherQualification;

    const jwt = localStorage.getItem("manager_jwt");

    const formData2 = new FormData();
    const registration = { ...submissionData };

    // Append data
    formData2.append(
      "registrationForm",
      new Blob([JSON.stringify(registration)], { type: "application/json" })
    );

    if (image) formData2.append("image", image);

    // console.log(image);

    // / Enhanced logging
    // console.log("FormData entries:");
    // for (let [key, value] of formData2.entries()) {
    //   if (value instanceof Blob) {
    //     console.log(`${key}: Blob`, {
    //       name: value.name,
    //       size: value.size,
    //       type: value.type,
    //     });
    //     } else if (value instanceof File) {
    //       console.log(`${key}: File`, {
    //         name: value.name,
    //         size: value.size,
    //         type: value.type,
    //       });
    //     } else {
    //     console.log(`${key}:`, value);
    //   }
    // }

    try {
      const res = await sendRegistrationForm(jwt, formData2);
      alert(res?.data?.message);
      setIsSubmit(true);
      navigate("/manager/registrations");
    } catch (error) {
      alert(error?.message);
      setIsSubmit(true);
    }
  };

  return (
    <div className="w-full max-w-[95%] mt-10 mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Registration Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <PersonalDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          image={image}
          handleImageChange={handleImageChange}
          errorMessage={errorMessage}
        />

        <QualificationDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
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

        <CheckboxGroup
          courses={data || []}
          selectedCourses={formData.registeredCourses}
          onCheckboxChange={handleCheckboxChange}
          errors={errors}
        />

        <PaymentDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          paymentTypes={paymentTypes}
          isInstallment={isInstallment}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="mt-4">
            {isSubmit ? "Submit" : "Submitting..."}
          </Button>
        </div>
      </form>
    </div>
  );
};
