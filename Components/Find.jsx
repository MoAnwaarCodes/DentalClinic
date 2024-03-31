import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Find = () => {
  const location = useLocation();
  const patientData = location.state?.arr;
  return (
    <div className="bg-teal-700 min-h-screen flex flex-col items-center justify-center">
      <img
        className="h-14 w-52 sm:w-60 mt-6"
        src="./Images/logo.png"
        alt="Logo"
      />
      <div className="mt-8">
        <h1 className="text-xl font-bold text-white mb-4">Patient Details</h1>
        {patientData ? (
          patientData.map((patient, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Name: {patient.name}
              </h2>
              <p className="text-sm text-gray-600">Date: {patient.date}</p>
              <p className="text-sm text-gray-600">Items:</p>
              <ul className="list-disc ml-6">
                {patient.item.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-800 font-bold">
                TotalBill: {patient.totalBill}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">No patient data found</p>
        )}
      
      </div>
      <button className="border rounded-2xl text-white bg-red-900 border-white h-10 mt-6 w-16 sm:w-30">
        <Link to='/'>Ok</Link>
        </button>
    </div>
  );
};

export default Find;
