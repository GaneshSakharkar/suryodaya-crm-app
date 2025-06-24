/* eslint-disable react/prop-types */
import { Checkbox } from "@material-tailwind/react";

const CheckboxGroup = ({
  label,
  options = [],
  selectedValues,
  onChange,
  error,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Find the course object from the options array based on the course name or identifier
    const course = options.find((option) => option.courseName === value);

    // Remove the course ID
    const courseWithoutId = { ...course };
    delete courseWithoutId.id;

    const updatedValues = checked
      ? [...selectedValues, courseWithoutId] // Add course object (without id)
      : selectedValues.filter(
          (item) => item.courseName !== courseWithoutId.courseName
        ); // Remove course object by courseName

    onChange({
      target: {
        name: "courses", // Update name to match the form state
        value: updatedValues, // Store the course object without id
      },
    });
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-4 text-lg">Courses Registered For</h2>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option) => (
          <Checkbox
            key={option.courseName} // Use courseName or other unique field
            label={option.courseName} // Display courseName in the checkbox label
            value={option.courseName} // Use courseName as the checkbox value
            checked={selectedValues.some(
              (selected) => selected.courseName === option.courseName
            )} // Check if course is selected
            onChange={handleCheckboxChange} // Handle the checkbox change
          />
        ))
      ) : (
        <p>No courses available.</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
