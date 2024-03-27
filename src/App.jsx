import React, { useState } from "react";

const App = () => {
  const [patient, setPatient] = useState([{ name: "", date: "", item: [] }]);
  return (
    <div>
      <button
        className="bg-red-500 border-2 border-black "
        onClick={async () => {
          console.log("cliecked");
          const response = await fetch(
            "http://192.168.100.9/dentalclinic/api/home/fetchdata?contact=03415436701"
          ).then(async (response) => {
            const data = await response.json();

            const arr = Object.values(
              data.reduce((acc, { Name, Date, item }) => {
                const key = `${Name}_${Date}`;
                if (!acc[key]) {
                  acc[key] = { name: Name, date: Date, item: [] };
                }
                acc[key].item.push(item);
                return acc;
              }, {})
            );

            console.log(arr);
            setPatient(arr);
          });
        }}
      >
        Click ME
      </button>
      <h1>{patient[0].name} </h1>
      {patient.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.date} </h1>
            <h1>{item.item.map((i,index)=><li key={index}>{i}</li>)}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default App;
