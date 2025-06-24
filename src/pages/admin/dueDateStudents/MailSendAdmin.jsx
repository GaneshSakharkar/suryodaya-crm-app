import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { sendEmail } from "../../../api/apiData";

export const MailSend = ({ isModalOpen, setIsModalOpen, selectedEntry }) => {
  const [emailForm, setEmailForm] = useState({
    name: "",
    to: "",
    subject: "",
    body: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Set the form fields based on the selected entry when the modal is opened
  useEffect(() => {
    if (selectedEntry) {
      setEmailForm({
        name: selectedEntry.name, // Prefill name for display
        to: selectedEntry.email, // Prefill "to" field with selected entry's email
        subject: "",
        body: "",
      });
    }
  }, [selectedEntry]);

  // Handle input field changes in the email form
  const handleEmailFormChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const sendEmailToStudent = async (emailReq) => {
    try {
      const jwt = localStorage.getItem("manager_jwt");
      const res = await sendEmail(jwt, emailReq, "admin");
      return res;
    } catch (error) {
      return console.log(error);
    }
  };

  // Handle form submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const errors = {};
    if (!emailForm.subject) errors.subject = "Subject is required.";
    if (!emailForm.body) errors.body = "Body is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare data for backend (exclude name)
    const emailData = {
      to: emailForm.to,
      subject: emailForm.subject,
      body: emailForm.body,
    };

    console.log("Email Form Submitted", emailData);

    // Send the data to the back-end
    sendEmailToStudent(emailData);
    alert("Email Send Successfully!!");
    setIsModalOpen(false);
    setEmailForm({
      name: "",
      to: "",
      subject: "",
      body: "",
    });
  };

  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
      <DialogHeader>Send Email</DialogHeader>
      <DialogBody>
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-2">
            <strong className="text-black">Send Email To: </strong>
          </div>
          <div className="mb-4">
            <Input
              placeholder="Recipient Name"
              label="Name"
              name="name"
              value={emailForm.name}
              disabled // Display only, not editable
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Recipient Email"
              label="To"
              name="to"
              value={emailForm.to}
              onChange={handleEmailFormChange}
              disabled // Prefilled from the selected entry, not editable
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Enter Subject"
              label="Subject"
              name="subject"
              value={emailForm.subject}
              onChange={handleEmailFormChange}
            />
            {formErrors.subject && (
              <p className="text-sm text-red-500">{formErrors.subject}</p>
            )}
          </div>
          <div className="mb-4">
            <Textarea
              label="Body"
              name="body"
              value={emailForm.body}
              onChange={handleEmailFormChange}
            />
            {formErrors.body && (
              <p className="text-sm text-red-500">{formErrors.body}</p>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="submit"
              variant="outlined"
              className="hover:bg-green-100"
              color="green"
            >
              Send Email
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
