import React from "react";

export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-200 font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
