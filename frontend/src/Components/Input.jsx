import React, { useId } from "react";

function Input({ label, type = "text", className = "", ...props }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="leading-7 text-sm text-gray-400" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full bg-gray-300 focus:border-1 border-gray-300 bg-opacity-30 h-14 border text-black outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${className}`}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
