import { Checkbox } from "@material-tailwind/react";

export const CheckboxGroup = ({
  label,
  options = [],
  selectedValues,
  onChange,
  enquiry,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Find the course object from the options array
    const course = options.find((option) => option.courseName === value);

    // If the course is selected (checked), add it to selectedValues, otherwise remove it
    const updatedValues = checked
      ? [
          ...selectedValues,
          { ...course, id: course.id || undefined }, // Add course with id if it exists
        ]
      : selectedValues.filter((item) => item.courseName !== course.courseName);

    // Ensure courses in enquiry.courses retain their id if they are selected
    const finalCourses = updatedValues.map((course) => {
      const existing = enquiry.courses.find(
        (existingCourse) => existingCourse.courseName === course.courseName
      );
      if (existing) {
        return { ...course, id: existing.id }; // Ensure the course gets its id if it's in enquiry.courses
      } else {
        const { id, ...courseWithoutId } = course; // Remove id for new courses
        return courseWithoutId;
      }
    });

    // Trigger the onChange handler with the new state
    onChange({
      target: {
        name: "courses",
        value: finalCourses,
      },
    });
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-4 text-lg">{label}</h2>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option) => (
          <Checkbox
            key={option.courseName}
            label={option.courseName}
            value={option.courseName}
            checked={selectedValues.some(
              (selected) => selected.courseName === option.courseName
            )}
            onChange={handleCheckboxChange}
          />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};
