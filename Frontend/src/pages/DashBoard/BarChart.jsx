import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartData = {
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'COVID-19 Stats',
        data: [data.cases, data.recovered, data.deaths],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Latest Cases in {data.country}</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
