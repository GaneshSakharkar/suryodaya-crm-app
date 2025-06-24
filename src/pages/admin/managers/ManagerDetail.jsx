import React, { act } from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ActiveManager, getManagerById } from "../../../api/apiData";

const ManagerDetail = () => {
  const { id } = useParams();
  const jwt = localStorage.getItem("admin_jwt");

  console.log(id);

  const { data: manager, refetch } = useQuery({
    queryKey: ["manager", id],
    queryFn: async () => {
      try {
        const res = await getManagerById(jwt, id);
        return res?.data?.data;
      } catch (error) {
        console.log(error);

        return [];
      }
    },
    refetchOnWindowFocus: true,
  });

  if (!manager) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="red">
          Manager data is not available.
        </Typography>
      </div>
    );
  }

  const activeTheManager = async (active) => {
    const confirmChange = confirm(
      `Are you sure you want to ${active ? "Active" : "Deactive"} this manager?`
    );
    if (confirmChange) {
      try {
        const res = await ActiveManager(jwt, { id, active });
        refetch();
        return alert(res?.data?.message);
      } catch (error) {
        console.log(error);
        refetch();
        return alert(error?.message);
      }
    }
  };

  const handleActiveManager = (active) => {
    activeTheManager(active);
  };

  return (
    <div className="p-6 mt-6 bg-white">
      <div className="flex gap-20">
        <Typography variant="h4" className="mb-6 font-bold">
          Manager Details
        </Typography>
      </div>
      <div className="p-6 w-full">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-20">
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Account Status:
              </Typography>
              <div className="flex gap-20">
                <p
                  className={`rounded-full px-4 py-1 ${
                    manager.active
                      ? "text-green-500  bg-green-50"
                      : "text-red-500 bg-red-50"
                  } font-bold`}
                >
                  {manager.active ? "Active" : "Deactive"}
                </p>
              </div>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Name:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.name || "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Email:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.email || "N/A"}
              </Typography>
            </div>

            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Registration Date:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.registationDate.substring(0, 10) || "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Last Login Date:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.loginDate || "N/A"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Total Enquiries:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.equiries?.length || 0}
              </Typography>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Total Registrations:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {manager.registrations?.length || 0}
              </Typography>
            </div>
            <div>
              <Typography
                variant="large"
                color="gray"
                className="font-semibold"
              >
                Role:
              </Typography>
              <p
                className={`font-bold ${
                  manager.role === "ADMIN" ? "text-green-500" : "text-blue-500"
                }`}
              >
                {manager.role}
              </p>
            </div>
            <div></div>
            <div></div>
            <div> </div>
            <div className="text-xl">
              <button
                onClick={() => handleActiveManager(!manager.active)}
                className={`rounded-lg px-4 py-1 ${
                  !manager.active
                    ? "text-green-500  bg-green-50"
                    : "text-red-500 bg-red-50"
                } font-bold`}
              >
                {!manager.active ? "Activate manager" : "Deactivate Manager"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;
