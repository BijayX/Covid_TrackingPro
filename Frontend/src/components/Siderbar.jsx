import React, { useState, useEffect } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import Help from "./Help/Help";

const Sidebar = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const fetchedCountries = data.map((country) => ({
          name: country.country,
          cases: country.cases,
          trend: country.todayCases > 0 ? "up" : "down",
        }));
        setCountries(fetchedCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading in case of an error as well
      });
  }, []);

  const filteredCountries = search
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries.slice(0, 24);

  if (loading) {
    return (
      <aside className="w-full md:w-5/6 lg:w-[400px] p-4 shadow-lg h-full bg-gray-100 flex justify-center items-center">
        <div className="loader"></div>
        <div className="ml-4">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-5/6 lg:w-[400px] p-4 shadow-lg h-full bg-gray-100">
      <input
        type="text"
        placeholder="Search Country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-full w-full text-center focus:outline-none"
      />
      <ul className="divide-y divide-gray-200">
        {filteredCountries.map((country) => (
          <li
            key={country.name}
            className="flex justify-between py-2 items-center"
          >
            <span className="font-bold text-lg w-1/4">
              {country.cases.toLocaleString()}
            </span>
            <span className="font-medium text-lg w-1/2 text-center">
              {country.name}
            </span>
            <span className="flex items-center w-1/4 justify-end">
              {country.trend === "up" && (
                <FiArrowUp className="text-green-500 ml-1" />
              )}
              {country.trend === "down" && (
                <FiArrowDown className="text-red-500 ml-1" />
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center items-center">
        <Help />
      </div>
    </aside>
  );
};

export default Sidebar;
