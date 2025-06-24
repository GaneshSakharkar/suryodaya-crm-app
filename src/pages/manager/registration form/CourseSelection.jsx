import { Checkbox } from "@material-tailwind/react";

const CourseSelection = ({ formData, handleChange, courses, isLoading }) => {
  if (isLoading) return <p>Loading courses...</p>;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Select Courses</h2>
      {courses?.map((course) => (
        <Checkbox
          key={course.courseName}
          label={course.courseName}
          name="registeredCourses"
          value={course.courseName}
          checked={formData.registeredCourses.some(
            (item) => item.courseName === course.courseName
          )}
          onChange={handleChange} // Ensure the change handler is passed down correctly
        />
      ))}
    </div>
  );
};

export default CourseSelection;
