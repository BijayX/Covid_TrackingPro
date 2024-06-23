import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import axios from 'axios'; // Import Axios

import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const BarGraph = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Nepal');
  const fixedLastUpdate = '2022-01-01T00:00:00Z'; 

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const countryData = data.find(country => country.country === selectedCountry);

  let filteredData;
  if (countryData) {
    filteredData = {
      country: countryData.country,
      cases: countryData.cases,
      recovered: countryData.recovered,
      deaths: countryData.deaths,
    };
  }

  const globalData = data.map(country => ({
    country: country.country,
    cases: country.cases,
    recovered: country.recovered,
    deaths: country.deaths,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <p className=" text-gray-600 mb-4 text-base ">Last Updated: {new Date(fixedLastUpdate).toLocaleString()}</p>
      <div className="mb-4">
        <label htmlFor="country-select" className="mr-2">Select Country:</label>
        <select id="country-select" value={selectedCountry} onChange={handleCountryChange} className="p-2 border rounded">
          {data.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData && (
          <>
            <BarChart data={filteredData} />
            <PieChart data={filteredData} />
          </>
        )}
      </div>
      <LineChart data={globalData} />
    </div>
  );
};

export default BarGraph;
