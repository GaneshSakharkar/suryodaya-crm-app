import { Checkbox } from "@material-tailwind/react";

const SourceCheckboxGroup = ({
  label,
  options,
  selectedValues = [], // Ensure it's always an array
  onChange,
  error,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedSource = checked
      ? [...selectedValues, value] // Add to the source array
      : selectedValues.filter((item) => item !== value); // Remove from the source array
    onChange(updatedSource); // Pass the updated array to the parent
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <div className="flex flex-wrap">
        {options.map((option) => (
          <div key={option} className="mr-4">
            <Checkbox
              label={option}
              value={option}
              checked={selectedValues.includes(option)} // Now works since selectedValues is guaranteed to be an array
              onChange={handleCheckboxChange} // Use the modified handler
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SourceCheckboxGroup;
