// src/components/ExpenditureChart.js
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const ExpenditureChart = ({ data }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Expenditure Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenditureChart;
