/* eslint-disable react/prop-types */
import { Checkbox } from "@material-tailwind/react";

const SourceCheckboxGroup = ({
  label,
  options = [],
  selectedValues,
  onChange,
  error,
}) => {
  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    const updatedValues = checked
      ? [...selectedValues, value] // Add to selectedValues
      : selectedValues.filter((item) => item !== value); // Remove from selectedValues

    onChange({
      target: {
        name: "source", // Adjust the name as per your form state
        value: updatedValues,
      },
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">
        How Did You Come to Know About Us?
      </h2>
      {/* Check if options is an array before using map */}
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={handleCheckboxChange}
          />
        ))
      ) : (
        <p>No options available.</p> // Handle the case when options are empty or undefined
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SourceCheckboxGroup;
