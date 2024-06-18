import React from "react";

const ProjectCard = ({ title, imageURL, shortDescription }) => {
  // Define the maximum length for the short description
  const maxLength = 100;

  // Function to truncate the short description
  const truncateDescription = (description) => {
    // Check if the description is longer than the maximum length
    if (description.length > maxLength) {
      // Truncate the description and add ellipsis
      return description.slice(0, maxLength) + "...";
    }
    // Return the full description if it's within the maximum length
    return description;
  };
  return (
    // <div onClick={onCardClick}>
    <div className="bg-white  rounded-xl shadow-lg flex flex-col gap-4 w-[320px] h-[350px] relative ml-[51px] cursor-pointer hover:bg-gray-100">
      {<img src={imageURL} alt="Uploaded" className="w-[320px]  rounded-t-xl h-[180px]" />}
      {/* <button
        onClick={handleClick}
        className="absolute top-0 right-0 m-2 w-8 h-7 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
      >
        X
      </button> */}
      <div className='flex flex-col gap-3 ml-3 mt-2 mr-3 overflow-hidden  '>
      <p className='text-[20px]  font-semibold'>{title}</p>
      <p className='text-[15px] overflow-hidden line-clamp-3'>{truncateDescription(shortDescription)}</p>
      </div>
    </div>
    // </div>
  );
  // return (
  //   <div className="project-card">
  //     <img src={imageURL} alt={title} />
  //     <h3>{title}</h3>
  //     <p>{truncateDescription(shortDescription)}</p>
  //   </div>
  // );
};

export default ProjectCard;
