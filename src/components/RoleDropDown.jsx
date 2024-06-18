import React from 'react';

const Dropdown = ({ selectedOption, onOptionSelect }) => {
  const options = ['Alumni', 'Admin'];

  return (
    <div className="inline-block relative">
      <select
        className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedOption}
        onChange={() => onOptionSelect(selectedOption)}
      >
        <option value="">Select an option</option>
        <option value="alumni">Alumni</option>
        <option value="admin">Admin</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.293 11.293a1 1 0 0 1 1.414 0L10 12.586l.293-.293a1 1 0 1 1 1.414 1.414l-1 1a1 1 0 0 1-1.414 0l-1-1a1 1 0 0 1 0-1.414zM10 6a1 1 0 0 1 .293.707l.707-.707A1 1 0 0 1 12.707 7.5l-1 1a1 1 0 1 1-1.414-1.414l.293-.293L10 6.586l-.293.293.293.293zM5 10a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
