import { Input, Option, Select } from "@material-tailwind/react";

export const EnquiriesFilters = ({
  searchQuery,
  idSearchQuery,
  filters,
  setSearchQuery,
  setIdSearchQuery,
  setFilters,
  colleges = [], // Default to empty array if undefined
  branches = [], // Default to empty array if undefined
  courses = [], // Default to empty array if undefined
  qualifications = [], // Default to empty array if undefined
}) => {
  // Handle changes for each filter field
  const handleCollegeChange = (value) => {
    setFilters((prev) => ({ ...prev, college: value }));
  };

  const handleBranchChange = (value) => {
    setFilters((prev) => ({ ...prev, branch: value }));
  };

  const handleCourseChange = (value) => {
    setFilters((prev) => ({ ...prev, course: value }));
  };

  const handleQualificationChange = (value) => {
    setFilters((prev) => ({ ...prev, qualification: value }));
  };

  return (
    <div className="flex flex-col gap-5 mb-5">
      <div className="flex gap-2">
        <div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Search by Name or Email"
            outline
          />
        </div>

        <div>
          <Input
            type="text"
            value={idSearchQuery}
            onChange={(e) => setIdSearchQuery(e.target.value)}
            label="Search by ID"
            outline
          />
        </div>
      </div>

      <div className="flex gap-2">
        {/* College Select */}
        <div>
          <Select
            value={filters.college || ""}
            onChange={(value) => {
              handleCollegeChange(value);
            }}
            label="Select College"
            variant="outlined"
          >
            <Option value="">Select College</Option>
            {colleges.length > 0 ? (
              colleges.map((college, index) => (
                <Option key={index} value={college}>
                  {college}
                </Option>
              ))
            ) : (
              <Option value="">No Colleges Available</Option>
            )}
          </Select>
        </div>

        {/* Branch Select */}
        <div>
          <Select
            value={filters.branch || ""}
            onChange={(value) => handleBranchChange(value)}
            label="Select Branch"
            variant="outlined"
          >
            <Option value="">Select Branch</Option>
            {branches.length > 0 ? (
              branches.map((branch, index) => (
                <Option key={index} value={branch}>
                  {branch}
                </Option>
              ))
            ) : (
              <Option value="">No Branches Available</Option>
            )}
          </Select>
        </div>

        {/* Course Select */}
        <div>
          <Select
            value={filters.course || ""}
            onChange={(value) => handleCourseChange(value)}
            label="Select Course"
            variant="outlined"
          >
            <Option value="">Select Course</Option>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <Option key={index} value={course}>
                  {course}
                </Option>
              ))
            ) : (
              <Option value="">No Courses Available</Option>
            )}
          </Select>
        </div>

        {/* Qualification Select */}
        <div>
          <Select
            value={filters.qualification || ""}
            onChange={(value) => handleQualificationChange(value)}
            label="Select Qualification"
            variant="outlined"
          >
            <Option value="">Select Qualification</Option>
            {qualifications.length > 0 ? (
              qualifications.map((qualification, index) => (
                <Option key={index} value={qualification}>
                  {qualification}
                </Option>
              ))
            ) : (
              <Option value="">No Qualifications Available</Option>
            )}
          </Select>
        </div>
      </div>
    </div>
  );
};
