/* eslint-disable react/prop-types */
// EnquiriesTable.jsx
import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export const EnquiriesTable = ({ enquiries }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/manager/enquiry/${id}`);
  };

  const handleCreateButtonClick = () => {
    navigate("/manager/enquiry-form");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-2 border ">ID</th>
            <th className="px-4 py-2 border ">Name</th>
            <th className="px-4 py-2 border ">Email</th>
            <th className="px-4 py-2 border ">College</th>
            <th className="px-4 py-2 border ">Branch</th>
            <th className="px-4 py-2 border ">Courses</th>
            <th className="px-4 py-2 border ">Qualification</th>
            <th className="px-4 py-2 border ">Date</th>
            <th className="px-4 py-2 border ">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.id}
                </td>
                <td className="px-4 py-2 text-blue-800  text-center border border-gray-300">
                  {enquiry.name}
                </td>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.email}
                </td>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.college}
                </td>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.branch}
                </td>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.courses
                    .map((course) => course.courseName)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.qualification}
                </td>
                <td className="px-4 whitespace-nowrap py-2 text-blue-800 text-center border border-gray-300">
                  {enquiry.enquiryDate.substring(0, 10)}{" "}
                </td>
                <td className="px-4 py-2  border border-gray-300">
                  <div className="flex justify-center items-center cursor-pointer">
                    <EyeIcon
                      className="w-6"
                      onClick={() => handleRowClick(enquiry.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="px-4 py-2 text-center border border-gray-300"
              >
                <div className="p-2 flex flex-col gap-2 justify-center items-center">
                  <p>No enquiries found. create one</p>
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
