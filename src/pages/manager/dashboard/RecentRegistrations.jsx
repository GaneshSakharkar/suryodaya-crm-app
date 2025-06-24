// src/components/RecentRegistrations.js
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const RecentRegistrations = ({ registrations }) => {
  return (
    <Paper className="p-6 mt-6 bg-white shadow-lg rounded-xl">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Recent Registrations
      </Typography>
      <Box className="space-y-4">
        {registrations.map((registration) => (
          <Box
            key={registration.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-200 cursor-pointer"
          >
            <Typography variant="body1" className="text-gray-700">
              {registration.studentName} - {registration.registrationDate}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Status: {registration.status}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentRegistrations;
