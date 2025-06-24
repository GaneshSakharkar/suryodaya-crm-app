/* eslint-disable react/prop-types */
import { Radio } from "@material-tailwind/react";

const RadioGroup = ({ label, options, selectedValue, onChange, error }) => {
  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { value } = e.target;
    onChange({
      target: {
        name: "qualification",
        value,
      },
    });
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-4 text-lg">Qualification</h2>
      {options.map((option) => (
        <Radio
          key={option}
          label={option}
          name="qualification"
          value={option}
          checked={selectedValue === option} // Check if the option is selected
          onChange={handleRadioChange} // Handle radio button change
        />
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RadioGroup;
