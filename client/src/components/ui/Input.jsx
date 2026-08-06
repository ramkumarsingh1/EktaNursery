import React from "react";

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  name,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    />
  );
}