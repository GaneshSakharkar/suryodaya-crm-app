import { useQuery } from "@tanstack/react-query";
import { getAllManagers } from "../../../api/apiData";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ManagersList = () => {
  const jwt = localStorage.getItem("admin_jwt");

  const {
    data: managers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["managers"],
    queryFn: async () => {
      try {
        const res = await getAllManagers(jwt);
        return res?.data?.data;
      } catch (error) {
        return console.log(error?.message);
      }
    },
    refetchOnWindowFocus: true,
  });

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/manager/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching managers</div>;

  console.log(managers);

  return (
    <div className="w-auto h-auto mt-10 mx-5 p-10 bg-white shadow-md rounded-md">
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold">All Managers</h1>
      </div>
      <div className="flex justify-center items-center">
        <table className="table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="border  px-4 py-2">Name</th>
              <th className="border  px-4 py-2">Email</th>
              <th className="border  px-4 py-2">Contact</th>
              <th className="border  px-4 py-2">Registation Date</th>
              <th className="border  px-4 py-2">Last Login</th>
              <th className="border  px-4 py-2">Total Enquiries</th>
              <th className="border  px-4 py-2">Total Registrations</th>
              <th className="border  px-4 py-2">Status</th>
              <th className="border  px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.length > 0 ? (
              managers.map((manager) => (
                <tr key={manager.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.contact || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.registationDate?.substring(0, 10) || "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                    {manager.loginDate || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.equiries?.length || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {manager.registrations?.length || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2  text-center">
                    <div
                      className={`rounded-full px-4 py-1 ${
                        manager.active
                          ? "text-green-500 bg-green-50"
                          : "text-red-500 bg-red-50"
                      }`}
                    >
                      {manager.active ? "Active" : "Deactive"}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center items-center cursor-pointer">
                      <EyeIcon
                        className="w-6"
                        onClick={() => handleRowClick(manager.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No Managers Found....
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagersList;
