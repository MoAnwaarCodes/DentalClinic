import React from "react";
import { useLocation } from "react-router-dom";

const Find = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  return (
    <div className="bg-teal-700 h-screen">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-20">
        <img
          className="h-14 w-52 sm:w-60 mt-6"
          src="./Images/logo.png"
          alt=""
        />
        <button onClick={() => console.log(patient)}>Click Me</button>
      </div>
    </div>
  );
};

export default Find;
