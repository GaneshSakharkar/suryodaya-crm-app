// src/components/EnquiryDetails.js
import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

const EnquiryDetails = ({ enquiry }) => {
  return (
    <Box className="mt-8">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Enquiry Details
      </Typography>
      <Paper className="p-6 bg-white shadow-lg rounded-xl">
        <Typography variant="body1" className="text-gray-700">
          Enquiry: {enquiry.enquiry}
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          Student: {enquiry.studentName}
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          Status: {enquiry.status}
        </Typography>
        <Button variant="contained" color="primary" className="mt-4">
          Resolve Enquiry
        </Button>
      </Paper>
    </Box>
  );
};

export default EnquiryDetails;
