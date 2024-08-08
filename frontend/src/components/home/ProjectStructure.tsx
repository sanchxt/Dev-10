import React, { useState } from "react";

const ProjectStructure: React.FC = () => {
  const [selectedType, setSelectedType] = useState("All Types");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white to-purple-500 py-4 px-4 flex justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
          Explore Amazing Projects Here
        </h1>
      </div>
      <div className="bg-gradient-to-r from-white to-purple-500 py-2 px-4 flex justify-center items-center shadow-md mt-4">
        <label
          className="text-lg md:text-xl lg:text-2xl font-semibold text-black mr-4"
          htmlFor="projectType"
        >
          Choose Project Type:
        </label>
        <select
          id="projectType"
          value={selectedType}
          onChange={handleTypeChange}
          className="appearance-none bg-white border border-purple-300 text-black text-base md:text-lg lg:text-xl rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="All Types">All Types</option>
          <option value="Game Dev">Game Dev</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Android Dev">Android Dev</option>
        </select>
      </div>
      {/* Other content goes here */}
    </div>
  );
};

export default ProjectStructure;
