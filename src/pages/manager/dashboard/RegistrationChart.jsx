// src/components/RegistrationChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RegistrationChart = ({ data }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Monthly Registrations
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;
