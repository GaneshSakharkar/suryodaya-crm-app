/* eslint-disable react/prop-types */
// SearchInput.jsx
import { Input } from "@material-tailwind/react";

export const SearchInput = ({ label, value, onChange, className }) => (
  <Input
    label={label}
    value={value}
    onChange={onChange}
    className={className}
  />
);
