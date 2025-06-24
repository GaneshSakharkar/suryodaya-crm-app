// src/components/EnquiryChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const EnquiryChart = ({ data }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Monthly Enquiries
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#10B981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnquiryChart;
