import { useState } from "react";
import { useParams } from "react-router-dom";
import { getRegistrationById, updateRegistration } from "../../../api/apiData";
import { useQuery } from "@tanstack/react-query";
import { Input, Button } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ImageDisplay from "../../../components/ui/ImageDisplay";

export const AdminRegistrationDetail = () => {
  const { id } = useParams();
  const jwt = localStorage.getItem("admin_jwt");
  //   const [isModalOpenMail, setIsModalOpenMail] = useState(false);
  const [editFields, setEditFields] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const fetchRegistrationById = async () => {
    try {
      const res = await getRegistrationById(jwt, id);
      return res?.data?.data;
    } catch (error) {
      console.error("Error fetching registration:", error);
      throw new Error("Failed to fetch registration details.");
    }
  };

  const {
    data: registration,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["registration", id],
    queryFn: fetchRegistrationById,
    onError: (error) => {
      console.error("Error fetching registration:", error.message);
    },
  });

  //   const [paymentForm, setPaymentForm] = useState({
  //     name: "",
  //     amountPaid: "",
  //     paymentType: "",
  //     email: "",
  //   });
  //   const [paymentFormErrors, setPaymentFormErrors] = useState({});
  //   const [paymentError, setPaymentError] = useState(null);
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  //   useEffect(() => {
  //     if (registration) {
  //       setPaymentForm({
  //         name: registration.name || "",
  //         amountPaid: "",
  //         paymentType: "",
  //         email: registration.email || "",
  //       });
  //     }
  //   }, [registration]);

  //   const handlePaymentFormChange = (e) => {
  //     setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  //   };

  //   const handlePaymentTypeChange = (e) => {
  //     setPaymentForm({
  //       ...paymentForm,
  //       paymentType: e.target.value.toUpperCase(),
  //     });
  //   };

  //   const validatePaymentForm = () => {
  //     const errors = {};
  //     if (!paymentForm.amountPaid || isNaN(paymentForm.amountPaid)) {
  //       errors.amountPaid = "Please enter a valid amount.";
  //     }
  //     if (!paymentForm.paymentType) {
  //       errors.paymentType = "Please select a payment type.";
  //     }
  //     setPaymentFormErrors(errors);
  //     return Object.keys(errors).length === 0;
  //   };

  //   const payInstallment = async (payReq) => {
  //     try {
  //       setIsSubmitting(true);
  //       const response = await payAmount(jwt, payReq, "manager");
  //       setIsSubmitting(false);
  //       return response;
  //     } catch (error) {
  //       setIsSubmitting(false);
  //       setPaymentError("Failed to process payment. Please try again.");
  //       console.error(error);
  //     }
  //   };

  //   const handlePaymentSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!validatePaymentForm()) return;

  //     const paymentData = {
  //       ...paymentForm,
  //       paymentType: paymentForm.paymentType.toUpperCase(),
  //     };

  //     try {
  //       const response = await payInstallment(paymentData);
  //       if (response) {
  //         alert(response?.data?.message);
  //         setPaymentForm({
  //           name: registration.name,
  //           amountPaid: "",
  //           paymentType: "",
  //           email: registration.email,
  //         });
  //         // Refetch the registration details
  //         refetch();
  //       }
  //     } catch (error) {
  //       console.error(error?.message);
  //     }
  //   };

  if (isLoading) {
    return <div>Loading registration details...</div>;
  }

  if (isError || !registration) {
    return <div>No registration details available.</div>;
  }

  const handleEditClick = (field) => {
    setShowDeleteButton(true);
    setEditFields((prev) => ({ ...prev, [field]: registration[field] }));
  };

  // console.log(editFields);

  const handleUpdate = async () => {
    const editableFields = ["amountPaid"]; // Editable fields excluding courses

    let newErrors = {};

    if (!editFields.amountPaid && editFields.amountPaid === 0)
      newErrors.amountPaid = "Amount Paid is required";
    // if (!editFields.email) newErrors.email = "email is required";
    // if (!editFields.college) newErrors.college = "college is required";
    // if (!editFields.contact) newErrors.contact = "contact is required";
    // if (!editFields.branch) newErrors.branch = "branch is required";
    // if (!editFields.qualification)
    //   newErrors.qualification = "qualification is required";

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      // setErrors(newErrors);
      return; // Stop form submission if errors exist
    }

    // if(errors)

    // Prepare the payload for backend submission
    const payload = {
      id: registration.id, // Include the enquiry ID for the update
      ...editableFields.reduce((acc, field) => {
        acc[field] =
          editFields[field] !== undefined
            ? editFields[field]
            : registration[field]; // Add editable fields to payload
        return acc;
      }, {}),
    };

    console.log("Full Payload to send:", payload);

    try {
      // Assuming updateEnquiry function sends the updated data to the backend
      const res = await updateRegistration(jwt, payload);
      setEditFields({});
      setShowUpdateButton(false);
      setShowDeleteButton(false);
      alert(res?.data?.message);
      refetch();
    } catch (error) {
      console.error("Error updating enquiry", error);
      alert(error?.message);
      setEditFields({});
      setShowUpdateButton(false);
      setShowDeleteButton(false);
      refetch();
    }
  };

  const handleCancelClick = () => {
    setEditFields({});
    setErrors({});
    setShowDeleteButton(false);
    setShowUpdateButton(false);
  };

  const handleFieldChange = (e, field) => {
    const { value } = e.target;
    validateField(field, value);
    setEditFields((prev) => ({ ...prev, [field]: e.target.value }));
    setShowUpdateButton(true);
  };

  // Real-time validation function
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "amountPaid" && parseInt(value) === 0) {
      newErrors.amountPaid = "Amount Paid must be greater than 0";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  // console.log(registration);

  // console.log(registration.receipts[0]);

  //   const handleDownloadReceipt = (receipt) => {
  //     const doc = new jsPDF();

  //     // Set up a nice header with company name
  //     doc.setFont("helvetica", "bold");
  //     doc.setFontSize(24);
  //     doc.setTextColor(0, 123, 255); // Blue color for the company name
  //     doc.text("Gradient Infotech", 20, 30);

  //     // Set font for receipt labels (bold)
  //     doc.setFont("helvetica", "bold");
  //     doc.setFontSize(12);
  //     doc.setTextColor(0, 0, 0); // Black color for the labels

  //     // Receipt labels
  //     doc.text("Receipt ID:", 20, 50);
  //     doc.text("Date:", 20, 60);
  //     doc.text("Payment Type:", 20, 70);
  //     doc.text("Received Amount:", 20, 80);
  //     doc.text("Sender:", 20, 90);
  //     doc.text("Towards:", 20, 100);

  //     // Set font for receipt values (normal)
  //     doc.setFont("helvetica", "normal");

  //     // Receipt details
  //     doc.text(`${receipt.id}`, 80, 50);
  //     doc.text(`${receipt.date}`, 80, 60);
  //     doc.text(`${receipt.paymentType}`, 80, 70);
  //     doc.text(`Rs. ${receipt.recievedAmount}`, 80, 80);
  //     doc.text(`${receipt.sender}`, 80, 90);
  //     doc.text(`${receipt.towards}`, 80, 100);

  //     // Add a footer or additional info
  //     doc.setFontSize(10);
  //     doc.text("Thank you for choosing Gradient Infotech!", 20, 120);
  //     doc.text("For any queries, please contact us.", 20, 130);

  //     // Save the PDF
  //     doc.save(`receipt_${receipt.id}.pdf`);
  //   };

  return (
    <div className="p-6 mt-6 bg-white shadow-md rounded-sm">
      <div className="flex flex-col lg:flex-row px-4">
        <div className="flex flex-col w-3/4 px-4  gap-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 ml-4">
              Registration Details
            </h2>
            <div className="flex gap-2 mr-4">
              {showUpdateButton && (
                <Button onClick={handleUpdate}>Update</Button>
              )}
              {showDeleteButton && (
                <Button onClick={handleCancelClick}>Cancel</Button>
              )}
              {/* <Button onClick={() => setIsModalOpenMail(true)}>
                Send Email
              </Button> */}
              {/* <MailSend
                isModalOpen={isModalOpenMail}
                setIsModalOpen={setIsModalOpenMail}
                selectedEntry={registration}
              /> */}
            </div>
          </div>
          {/* Registration Details */}
          {registration.imageUrl && (
            <div className="">
              <ImageDisplay url={registration.imageUrl} />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="p-4">
              <h3 className="font-bold">ID</h3>
              <strong className="text-blue-600">{registration.id}</strong>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Name</h3>
              <div className="flex gap-1">
                <p>{registration.name}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Email</h3>
              <div className="flex gap-1">
                <p>{registration.email}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Contact</h3>
              <div className="flex gap-1">
                <p>{registration.contact}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">College</h3>
              <div className="flex gap-1">
                <p>{registration.college}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Branch</h3>
              <div className="flex gap-1">
                <p>{registration.branch}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Qualification</h3>
              <div className="flex gap-1">
                <p>{registration.qualification}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Payment Type</h3>
              <p>{registration.paymentType}</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Registered Date</h3>
              <p>{registration.registrationDate?.substring(0, 10)}</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Registered Courses</h3>
              <p>
                {registration.registeredCourses?.length > 0
                  ? registration.registeredCourses
                      .map((course) => course.courseName)
                      .join(", ")
                  : "No courses registered."}
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Total Fees</h3>
              <p>
                ₹ <strong>{registration.totalFees}</strong>
              </p>
            </div>
            {registration.totalFees !== parseInt(registration.amountPaid) && (
              <div className="p-4">
                <h3 className="font-bold">Balance Fees</h3>
                <p>
                  ₹{" "}
                  <strong className="text-red-500">
                    {registration.totalFees - parseInt(registration.amountPaid)}
                  </strong>
                </p>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold">Amount Paid</h3>
              <p>
                ₹{" "}
                <strong className="text-green-500">
                  {registration.amountPaid}
                </strong>
                <PencilSquareIcon
                  onClick={() => handleEditClick("amountPaid")}
                  className="w-5 h-5 inline-block ml-2 cursor-pointer text-gray-500"
                />
              </p>
              {editFields.amountPaid !== undefined && (
                <div className="mt-2">
                  <Input
                    label="Amount paid"
                    type="number"
                    name="amountPaid"
                    value={editFields.amountPaid}
                    onChange={(e) => handleFieldChange(e, "amountPaid")}
                    className="mt-1"
                  />
                  {errors.amountPaid && (
                    <p className="text-red-500 text-sm">{errors.amountPaid}</p>
                  )}
                </div>
              )}
            </div>
            {registration.installmentsMonths !== 0 && (
              <div className="p-4">
                <h3 className="font-bold">Installment Months</h3>
                <p>{registration.installmentsMonths}</p>
              </div>
            )}
            {registration.installments !== 0 && (
              <div className="p-4">
                <h3 className="font-bold">Installments</h3>
                <p>
                  ₹ <strong>{registration.installments}</strong>
                </p>
              </div>
            )}
            {registration.installments !== 0 && (
              <div className="p-4">
                <h3 className="font-bold">Installment Deu Date</h3>
                <strong>{registration.deuDate?.substring(0, 10)}</strong>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold">Source</h3>
              <p>{registration.source}</p>
            </div>
            <div className="p-4">
              <h3 className="font-bold">Status</h3>
              <p
                className={`font-bold ${
                  registration.installments === 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {registration.installments === 0 ? "Fees Paid" : "Fees Pending"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/4">
          {/* Payment Form */}
          {/* <div>
            {registration.installmentsMonths > 0 && (
              <div className="flex flex-col border p-2 shadow-sm rounded-md text-xs">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold">Pay Installment</h2>
                </div>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-4">
                    <Input
                      placeholder="Enter Name"
                      label="Name"
                      name="name"
                      value={paymentForm.name}
                      onChange={handlePaymentFormChange}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      placeholder="Enter Email"
                      label="Email"
                      name="email"
                      value={paymentForm.email}
                      onChange={handlePaymentFormChange}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      placeholder="Enter Amount Paid"
                      label="Amount Paid"
                      name="amountPaid"
                      value={paymentForm.amountPaid}
                      onChange={handlePaymentFormChange}
                    />
                    {paymentFormErrors.amountPaid && (
                      <p className="text-sm text-red-500">
                        {paymentFormErrors.amountPaid}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium">Payment Type</p>
                    <div className="flex items-center w-auto">
                      {["CASH", "CHEQUE", "ONLINE"].map((type) => (
                        <Radio
                          key={type}
                          name="paymentType"
                          value={type}
                          label={type}
                          checked={paymentForm.paymentType === type}
                          onChange={handlePaymentTypeChange}
                        />
                      ))}
                    </div>
                    {paymentFormErrors.paymentType && (
                      <p className="text-sm text-red-500">
                        {paymentFormErrors.paymentType}
                      </p>
                    )}
                  </div>
                  {paymentError && (
                    <p className="text-red-500 mb-4">{paymentError}</p>
                  )}
                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="filled"
                      disabled={
                        !paymentForm.amountPaid ||
                        !paymentForm.paymentType ||
                        isSubmitting
                      }
                      className="px-10"
                    >
                      {isSubmitting ? "Processing..." : "Pay"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div> */}
          {/* <div className="mt-5 text-xs shadow-sm rounded-md border p-3">
            <h3 className="text-xl font-semibold mb-4">
              Existing Payment Details
            </h3>
            {registration.receipts.length > 0 ? (
              <div
                className="flex flex-col p-2 gap-4 overflow-y-auto"
                style={{ maxHeight: "300px" }} // Set a fixed height for the scrollable area
              >
                {registration.receipts.map((detail, index) => (
                  <div
                    key={detail.id}
                    className="p-4 border rounded-lg shadow-md"
                  >
                    <div className="flex flex-col px-2 gap-2">
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <strong>{index + 1}.</strong>
                          <p className="text-green-500 font-bold">
                            {detail.paymentType}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700">
                          <strong>Date:</strong>{" "}
                          {detail.date.substring(0, 10) || "N/A"}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm ">
                          <strong>Amount: ₹</strong>
                          {detail.recievedAmount}
                        </p>
                        <p className=" px-2 rounded-xl bg-green-100 text-green-700">
                          paid
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDownloadReceipt(detail)}
                          className="px-4 py-2 rounded-md shadow-md uppercase text-white bg-black"
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-md">
                No payment details found for this registration..
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
