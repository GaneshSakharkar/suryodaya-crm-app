import { useState, useEffect } from "react";
import { Button, Input, Radio } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { payAmount } from "../../../api/apiData";
import { useNavigate } from "react-router-dom";

export const PayAmount = ({
  isModalOpen,
  setIsModalOpen,
  selectedEntry,
  refetch,
}) => {
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    amountPaid: "",
    paymentType: "",
    email: "",
  });
  const [paymentFormErrors, setPaymentFormErrors] = useState({});

  // Set the form fields based on the selected entry when the modal is opened
  useEffect(() => {
    if (selectedEntry) {
      setPaymentForm({
        name: selectedEntry.name,
        amountPaid: "",
        paymentType: "", // Reset payment type
        email: selectedEntry.email,
      });
    }
  }, [selectedEntry]);

  // Handle input field changes in the payment form
  const handlePaymentFormChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const payInstallment = async (payReq) => {
    try {
      const jwt = localStorage.getItem("manager_jwt");

      const res = await payAmount(jwt, payReq, "manager");
      alert(res?.data?.message);
      refetch();
    } catch (error) {
      console.log(error);
      return alert(error?.message);
    }
  };

  // Handle radio button change for payment type
  const handlePaymentTypeChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      paymentType: e.target.value.toUpperCase(),
    }); // Convert to uppercase
  };

  // Handle form submission (for payment)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Ensure the payment type is in uppercase before submitting
    const paymentData = {
      ...paymentForm,
      paymentType: paymentForm.paymentType.toUpperCase(), // Force to uppercase
    };

    console.log("Payment Form Submitted", paymentData);
    payInstallment(paymentData);
    setIsModalOpen(false); // Close the modal
    setPaymentForm({
      name: "",
      amountPaid: "",
      paymentType: "",
      email: "",
    });

    // navigate(0);
  };

  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
      <DialogHeader>Pay Amount</DialogHeader>
      <DialogBody>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-4">
            <Input
              placeholder="Enter Name"
              label="Name"
              name="name"
              value={paymentForm.name}
              onChange={handlePaymentFormChange}
              readOnly // Disable editing the name since it's prefilled
            />
            {paymentFormErrors.name && (
              <p className="text-sm text-red-500">{paymentFormErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              placeholder="Enter Email"
              label="Email"
              name="email"
              value={paymentForm.email}
              onChange={handlePaymentFormChange}
              readOnly
            />
            {paymentFormErrors.email && (
              <p className="text-sm text-red-500">{paymentFormErrors.email}</p>
            )}
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
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Radio
                  name="paymentType"
                  value="CASH"
                  label="Cash"
                  checked={paymentForm.paymentType === "CASH"}
                  onChange={handlePaymentTypeChange}
                />
              </div>
              <div className="flex items-center">
                <Radio
                  name="paymentType"
                  value="CHEQUE"
                  label="Cheque"
                  checked={paymentForm.paymentType === "CHEQUE"}
                  onChange={handlePaymentTypeChange}
                />
              </div>
              <div className="flex items-center">
                <Radio
                  name="paymentType"
                  value="ONLINE"
                  label="Online"
                  checked={paymentForm.paymentType === "ONLINE"}
                  onChange={handlePaymentTypeChange}
                />
              </div>
            </div>
            {paymentFormErrors.paymentType && (
              <p className="text-sm text-red-500">
                {paymentFormErrors.paymentType}
              </p>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="submit"
              variant="outlined"
              className="hover:bg-green-100"
              color="green"
            >
              Pay
            </Button>
            <Button
              variant="outlined"
              className="hover:bg-red-100"
              color="red"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};
