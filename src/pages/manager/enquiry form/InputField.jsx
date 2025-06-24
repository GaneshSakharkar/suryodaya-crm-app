/* eslint-disable react/prop-types */
import { Input } from "@material-tailwind/react";

const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className="mb-6">
    <Input
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      className="w-full"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;
