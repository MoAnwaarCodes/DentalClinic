import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Find from "./Find";

const Home = () => {
  const url = "http://192.168.100.9";
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [bill, setBill] = useState(0);
  const [afterDiscount, setADiscount] = useState(0);
  const [sqlDateFormat, setSqlDateFormat] = useState("");

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Get the day of the month (1-31)
    const currentDayOfMonth = currentDate.getDate();

    // Get the month (0-11), then add 1 to match SQL's month format (1-12)
    const currentMonth = currentDate.getMonth() + 1;

    // Convert the day and month to string and prepend '0' if needed to ensure two-digit format
    const formattedDayOfMonth =
      currentDayOfMonth < 10
        ? "0" + currentDayOfMonth
        : currentDayOfMonth.toString();
    const formattedMonth =
      currentMonth < 10 ? "0" + currentMonth : currentMonth.toString();

    // Form the SQL date format (YYYY-MM-DD) using the formatted day and month
    const sqlDateFormat = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDayOfMonth}`;

    // Update the state with the SQL date format
    setSqlDateFormat(sqlDateFormat);
  }, []);

  const [item, setItem] = useState([
    {
      name: "Temp Dressing",
      price: 1000,
    },
    {
      name: "Composit Filling",
      price: 2000,
    },
    {
      name: "GIC Filling",
      price: 2000,
    },
    {
      name: "ACR",
      price: 2000,
    },
    {
      name: "Metal Porceline Crown",
      price: 5000,
    },
    {
      name: " Partial Denture",
      price: 2000,
    },
    {
      name: "Zirconia Crown",
      price: 15000,
    },
    {
      name: "Complete Denture",
      price: 30000,
    },
    {
      name: "Complete Denture with Monoplast",
      price: 60000,
    },
    {
      name: "Removeable Braces",
      price: 20000,
    },
    {
      name: "Fix Braces",
      price: 80000,
    },
    {
      name: "Complete Scaling + Polisihing",
      price: 5000,
    },
    {
      name: "Exraction Tooth",
      price: 1000,
    },
    {
      name: "Impection",
      price: 5000,
    },
  ]);

  const [patient, setPatient] = useState([]);
  const [cFind, setCFind] = useState("");
  const searchHandler = async () => {
    const response = await fetch(
      `${url}/dentalclinic/api/home/fetchdata?contact=${cFind}`
    ).then(async (response) => {
      const data = await response.json();
      const arr = Array.from(
        data
          .reduce((acc, { name, date, item ,totalBill}) => {
            const key = `${name}_${date}`;
            const existing = acc.get(key);
            if (existing) {
              existing.item.push(item);
            } else {
              acc.set(key, { name: name, date: date, item: [item],totalBill });
            }
            return acc;
          }, new Map())
          .values()
      );

         navigation("/Find", { state: { arr } });
    });
  };

  const [listItems, setListItems] = useState([]);
  const [discount, setDiscount] = useState("");
  const details = {
    patient: {
      name: name,
      age: age,
      contact: contact,
    },
    visits: {
      date: sqlDateFormat,
      totalBill: afterDiscount,
    },
    items: listItems,
  };

  const MyButton = ({ source, name, price }) => {
    return (
      <div className="h-48 w-32 flex flex-col items-center">
        <p className="text-center text-white mt-2 mb-2 font-bold">{name}</p>
        <div
          className="border-2 rounded-2xl border-white mb-4 overflow-hidden"
          onClick={() => {
            const updatedList = [{ name: name, price: price }, ...listItems];
            setListItems(updatedList);
            setBill(bill + price);
            setADiscount(bill + price);
          }}
        >
          <img
            src={source}
            alt=""
            className="object-cover w-full h-32 rounded-xl"
          />
        </div>
      </div>
    );
  };
  const bgHeight = `${100 + listItems.length * 100}px`;

  return (
    <div className="bg-teal-700" style={{ minHeight: bgHeight }}>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-20 ">
        <img
          className="h-14 w-52 sm:w-60 mt-6"
          src="./Images/logo.png"
          alt=""
        />
        <div className="space-x-3">
          <input
            onChange={(e) => setCFind(e.target.value)}
            className="h-10 w-40 sm:w-52 border mt-6 rounded-2xl p-2"
            type="text"
          />
          <button
            onClick={searchHandler}
            className="border rounded-2xl text-white bg-red-900 border-white h-10 mt-6 w-16 sm:w-30"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex mt-6">
        <div className="flex h-screen flex-col w-1/2 ">
          <div className="h-auto border-t-2 border-l-2 border-r-2 border-blue-400 p-4 flex flex-col">
            <div className="mb-4">
              <label className="block text-white">Name :</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border border-black rounded-md p-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Age :</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
                className="border rounded-md p-1 border-black"
              />
            </div>
            <div>
              <label className="block text-white">Contact No :</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                className="border rounded-md p-1 border-black"
              />
            </div>
          </div>
          <div className="flex-1  border-2 p-4 border-blue-400">
            <h1 className="flex justify-center text-white font-bold text-2xl">
              Billing!!!
            </h1>

            {listItems.map((item, index) => {
              return (
                <ol key={index} className="text-white ml-4 flex-1">
                  <li>
                    {index + 1} : {item.name} {item.price}-Rs
                  </li>
                </ol>
              );
            })}
            <h1 className="text-white font-bold mt-4 text-xl">
              Total : {bill}
            </h1>
            <div className="flex flex-col">
              <div>
                <label className="text-white font-bold mt-4 text-xl">
                  Discount :{" "}
                </label>
                <input
                  value={discount}
                  type="text"
                  className="border-b-2 w-36"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <button
                className="border bg-red-500 rounded-md text-white p-1 mt-4 w-32 ml-20"
                onClick={() => {
                  if (name == "Muhammad Anwar" && contact == "03318900144") {
                    setADiscount("Free for this person");
                    setDiscount("");
                  } else {
                    setADiscount(bill - parseFloat(discount));
                    setDiscount("");
                  }
                }}
              >
                Discount
              </button>
            </div>

            <h1 className="font-bold mt-4 text-xl text-white">
              After Discount : {afterDiscount}
            </h1>
            <button
              className="border bg-red-500 rounded-md text-white  p-1 mt-4 w-32 ml-20"
              onClick={async () => {
                try {
                  fetch(`${url}/dentalclinic/api/home/InsertPatient`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(details),
                  }).then(() => {
                    alert("Patient Record saved successfully");
                    setName("");
                    setAge("");
                    setContact("");
                    setListItems([]);

                    setBill(0);
                    setADiscount(0);
                  });
                } catch (error) {
                  console.log(error.message);
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex-1 w-1/2 p-6 border-t-2  border-blue-400 flex flex-wrap justify-start space-x-4 ">
          {item.map((item, index) => {
            return (
              <MyButton
                key={index}
                name={item.name}
                price={item.price}
                source={`./Images/${index}.jpeg`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
