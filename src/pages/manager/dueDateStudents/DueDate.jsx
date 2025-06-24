import { useQuery } from "@tanstack/react-query";
import { getDueRegistration } from "../../../api/apiData";
import { DueDateTable } from "./DueDateTable";

export const DueDate = () => {
  // Fetch data using react-query
  const {
    data: dueForm = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dueForm"],
    queryFn: async () => {
      const jwt = localStorage.getItem("manager_jwt");
      const res = await getDueRegistration(jwt, "manager");
      return res?.data?.data || [];
    },
    refetchOnWindowFocus: true,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-[calc(100%-4rem)] h-auto mt-10 mx-auto p-10 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4">Loading Registrations...</h1>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-auto h-auto mt-10 mx-auto p-8 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-red-500">
          Error Loading Registrations
        </h1>
        <p>{error.message || "Something went wrong."}</p>
      </div>
    );
  }

  // Render data table
  return (
    <div className="w-auto h-auto mt-10 mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Due Date Of Students : </h1>
      <DueDateTable refetch={refetch} dueForm={dueForm} />
    </div>
  );
};
