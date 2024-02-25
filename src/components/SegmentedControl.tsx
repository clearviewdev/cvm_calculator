import React, { useState, useEffect } from "react";

interface SegmentedControlProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  value,
  options,
  onChange,
}) => {
  const handleOptionClick = (option: string) => {
    onChange(option);
  };

  return (
    <div className="ring-2 ring-gray-200 rounded-lg align-center overflow-hidden w-full">
      <div
        className={
          "flex flex-col sm:flex-row sm:divide-x divide-gray-200 rounded-lg"
        }
      >
        {options.map((option) => (
          <div
            key={option}
            className={`segment ${
              value === option
                ? "active bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            } transition-all duration-300 ease-in-out
            sm:flex-1 sm:w-auto
            `}
            onClick={() => handleOptionClick(option)}
          >
            <input
              type="radio"
              name="segmented-control"
              className="opacity-0 absolute w-auto"
            />
            <label className="cursor-pointer block font-semibold py-3 text-center">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
