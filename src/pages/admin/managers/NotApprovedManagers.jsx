import { useQuery } from "@tanstack/react-query";
import { ApproveManager, getAllAprrovalReq } from "../../../api/apiData";
import { useNavigate } from "react-router-dom";

const ManagersReq = () => {
  const jwt = localStorage.getItem("admin_jwt");

  const {
    data: managers,
    isLoading,
    error,
    refetch, 
  } = useQuery({
    queryKey: ["managers"],
    queryFn: async () => {
      try {
        const res = await getAllAprrovalReq(jwt);
        return res?.data?.data;
      } catch (error) {
        return console.log(error?.message);
      }
    },
  });

  const navigate = useNavigate();

  // Handle the approve/disable action
  const handleManagerStatusChange = async (id, approved) => {
    // updateManagerStatus({ jwt, managerId, status });
    console.log(id, approved);

    try {
      const res = await ApproveManager(jwt, { id, approved });
      alert(res?.data?.message);
      refetch();
      navigate("/admin/managers");
    } catch (error) {
      alert(error?.message);
      refetch();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching managers</div>;

  return (
    <div className="w-full h-auto mt-10 mx-auto p-10 bg-white shadow-md rounded-md">
      <div className=" mb-10">
        <h1 className="text-xl font-bold">Manager Approval Request</h1>
      </div>

      <div>
        {managers.length !== 0 ? (
          managers.map((manager, index) => (
            <div
              key={manager.id}
              className="bg-white mt-5 text-sm flex gap-10 shadow-md rounded-lg p-6 border border-gray-300"
            >
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex justify-between items-center">
                    <strong>{index + 1}. </strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className=" text-lg">
                      <strong>Name: </strong> {manager.name || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-sm px-4 py-1 rounded-full ${
                        manager.isActive
                          ? "text-green-500 bg-green-100"
                          : "text-red-500 bg-red-100"
                      }`}
                    >
                      {manager.isActive ? "Approved" : "Pending"}
                    </p>
                  </div>
                </div>
                <div className="flex ml-5 justify-between items-center">
                  <p>
                    {" "}
                    <strong>Date: </strong> {manager.registationDate || "N/A"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleManagerStatusChange(manager.id, true)}
                disabled={manager.isActive}
                className="bg-green-100 border hover:border-green-500 text-green-500 px-4 my-2 rounded mr-2 disabled:opacity-50"
              >
                Approve
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white mt-5 text-sm">
            <p>There are no approval request today...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagersReq;
