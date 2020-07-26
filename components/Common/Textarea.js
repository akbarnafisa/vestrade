import React from "react";

export default ({
  className,
  disabled,
  label,
  onChange,
  placeholder,
  rows = `3`,
  type = `text`,
  value,
}) => {
  return (
    <div className={`${className} mb-4`}>
      <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
      <textarea
        className="px-6 py-3 focus:border focus:border-black focus:bg-white  bg-gray-200  rounded w-full"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        type={type}
        value={value}
      />
    </div>
  );
};
