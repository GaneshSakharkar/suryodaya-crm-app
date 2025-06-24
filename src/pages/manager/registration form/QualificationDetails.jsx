import { Input, Radio } from "@material-tailwind/react";

const QualificationDetails = ({ formData, errors, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Qualification</h2>

      {/* Render Radio Buttons for Qualifications */}
      {["BE", "BCA", "MCA", "Others"].map((option) => (
        <Radio
          key={option}
          label={option}
          name="qualification"
          value={option}
          checked={formData.qualification === option}
          onChange={handleChange}
        />
      ))}

      {/* Display Error if Qualification is not selected */}
      {errors.qualification && (
        <div className="text-red-500 text-sm mt-1">{errors.qualification}</div>
      )}

      {/* Render Input for Other Qualification if "Others" is selected */}
      {formData.qualification === "Others" && (
        <div>
          <Input
            label="Enter Other Qualification"
            name="otherQualification"
            value={formData.otherQualification}
            onChange={handleChange}
            error={!!errors.otherQualification}
          />
          {/* Display Error if Other Qualification is required and empty */}
          {errors.otherQualification && (
            <div className="text-red-500 text-sm mt-1">
              {errors.otherQualification}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QualificationDetails;
