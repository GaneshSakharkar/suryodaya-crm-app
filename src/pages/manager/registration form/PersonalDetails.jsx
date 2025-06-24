import { Input } from "@material-tailwind/react";

const PersonalDetails = ({
  formData,
  errors,
  handleChange,
  image,
  handleImageChange,
  errorMessage,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
      <div className="mt-5">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mt-5">
        <Input
          label="Contact"
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact}</p>
        )}
      </div>
      <div className="mt-5">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mt-5">
        <Input
          label="College"
          name="college"
          value={formData.college}
          onChange={handleChange}
          error={errors.college}
        />
        {errors.college && (
          <p className="text-red-500 text-sm">{errors.college}</p>
        )}
      </div>
      <div className="mt-5">
        <Input
          label="Branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          error={errors.branch}
        />
        {errors.branch && (
          <p className="text-red-500 text-sm">{errors.branch}</p>
        )}
      </div>
      <div className="mt-5">
        <Input
          label="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          error={errorMessage}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PersonalDetails;
