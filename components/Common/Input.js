import React from "react";

const Input = ({
  className,
  disabled,
  label,
  onChange,
  placeholder,
  type = `text`,
  value,
}) => {
  return (
    <div className={`${className} mb-4`}>
      {
        label && <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
      }
      <input
        className="px-6 py-3 focus:border focus:border-black focus:bg-white  bg-gray-200  rounded w-full"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
