import React from 'react';

const NewsUpdate = ({ title, description, date }) => {
  return (
    <div className="border-b-2 border-gray-300 pb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500 italic">{date}</p>
    </div>
  );
};

export default NewsUpdate;
