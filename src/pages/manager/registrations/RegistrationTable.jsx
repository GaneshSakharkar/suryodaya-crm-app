import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const RegistrationTable = ({ registrations }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/manager/registration/${id}`);
  };

  const handleCreateButtonClick = () => {
    navigate("/manager/registration-form");
  };

  return (
    <div className="overflow-x-auto">

       <div className="flex justify-end mb-2">
    <Button size="sm" onClick={handleCreateButtonClick}>
      Create Registration
    </Button>
  </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-2 py-1 border text-sm md:text-base">ID</th>
            <th className="px-2 py-1 border text-sm md:text-base">Name</th>
            <th className="px-2 py-1 border text-sm md:text-base">Email</th>
            <th className="px-2 py-1 border text-sm md:text-base">College</th>
            <th className="px-2 py-1 border text-sm md:text-base">Branch</th>
            <th className="px-2 py-1 border text-sm md:text-base">
              Qualification
            </th>
            <th className="px-2 py-1 border text-sm md:text-base">
              Payment Type
            </th>
            <th className="px-2 py-1 border text-sm md:text-base">
              Registered Courses
            </th>
            <th className="px-2 py-1 border text-sm md:text-base">
              Registered Date
            </th>
            <th className="px-2 py-1 border text-sm md:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? (
            registrations.map((registration) => (
              <tr key={registration.id} className="text-center">
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.id}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.name}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.email}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.college}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.branch}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.qualification}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.paymentType}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.registeredCourses
                    .map((course) => course.courseName)
                    .join(", ")}
                </td>
                <td className="px-2 py-2 text-blue-800 border border-gray-300 text-sm md:text-base">
                  {registration.registrationDate.substring(0, 10)}
                </td>
                <td className="px-2 py-1 border border-gray-300 text-sm md:text-base">
                  <div className="flex justify-center items-center cursor-pointer">
                    <EyeIcon
                      className="w-6"
                      onClick={() => handleRowClick(registration.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="px-2 py-1 text-center border border-gray-300"
              >
                <div className="p-2 flex flex-col gap-2 justify-center items-center">
                  <p>No registrations found. create one.</p>
                  <Button size="sm" onClick={handleCreateButtonClick}>
                    Create
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
