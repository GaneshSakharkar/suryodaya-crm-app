// src/components/ManagerDashboard.js
import React, { useState } from "react";
import { Grid } from "@mui/material";
import RegistrationChart from "./RegistrationChart";
import EnquiryChart from "./EnquiryChart";
import ExpenditureChart from "./ExpenditureChart";
import RecentRegistrations from "./RecentRegistrations";
import RecentEnquiries from "./RecentEnquiries";
import EnquiryDetails from "./EnquiryDetails";
import RegistrationTable from "./RegistrationTable";
import { useQuery } from "@tanstack/react-query";
import {
  getRecentEnquiries,
  getRecentRegistrations,
} from "../../../api/apiData";

const registrationData = [
  { month: "January", count: 50 },
  { month: "February", count: 70 },
  { month: "March", count: 65 },
  { month: "April", count: 80 },
  { month: "May", count: 90 },
];

const enquiryData = [
  { month: "January", count: 40 },
  { month: "February", count: 60 },
  { month: "March", count: 55 },
  { month: "April", count: 75 },
  { month: "May", count: 85 },
];

const expenditureData = [
  { category: "registrations", amount: 3000 },
  { category: "investments", amount: 2000 },
  { category: "Utilities", amount: 1500 },
  { category: "Miscellaneous", amount: 1000 },
];

const ManagerDashboard = () => {
  const jwt = localStorage.getItem("manager_jwt");

  const { data: recentRegistrations } = useQuery({
    queryKey: ["recentRegistrations"],
    queryFn: async () => {
      try {
        const res = await getRecentRegistrations(jwt, "manager");
        return res?.data?.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  const { data: recentEnquiries } = useQuery({
    queryKey: ["recentEnquiries"],
    queryFn: async () => {
      try {
        const res = await getRecentEnquiries(jwt, "manager");
        // console.log(res);
        return res?.data?.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  console.log(recentEnquiries);

  return (
    <div className="flex-1 p-8 bg-white">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <RegistrationChart data={registrationData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnquiryChart data={enquiryData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExpenditureChart data={expenditureData} />
        </Grid>
      </Grid>

      <RegistrationTable registrations={recentRegistrations} />
      <RecentEnquiries enquiries={recentEnquiries} />
    </div>
  );
};

export default ManagerDashboard;
