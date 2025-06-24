// src/components/RegistrationTable.js
import React from "react";
import { Box, Typography } from "@mui/material";

const RegistrationTable = ({ registrations }) => {
  return (
    <Box className="mt-8">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Recent Registrations
      </Typography>
      <div className="overflow-x-auto mt-5 bg-white shadow-sm ">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-300">
              <th className="border  px-4 py-2">Student Name</th>
              <th className="border  px-4 py-2">Student Email</th>
              <th className="border  px-4 py-2">Registration Date</th>
              <th className="border  px-4 py-2">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {registrations && registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.registrationDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{" "}
                    <strong className="text-green-500">
                      {registration.amountPaid}
                    </strong>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No registrations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default RegistrationTable;
