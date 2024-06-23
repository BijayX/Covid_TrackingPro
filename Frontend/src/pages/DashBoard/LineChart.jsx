import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, filter }) => {
  const chartData = {
    labels: data.map(country => country.country),
    datasets: [
      {
        label: 'Cases',
        data: data.map(country => country.cases),
        borderColor: '#3498db',
        fill: false
      },
      {
        label: 'Recovered',
        data: data.map(country => country.recovered),
        borderColor: '#2ecc71',
        fill: false
      },
      {
        label: 'Deaths',
        data: data.map(country => country.deaths),
        borderColor: '#e74c3c',
        fill: false
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-semibold mb-2">Global Trend ({filter})</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
