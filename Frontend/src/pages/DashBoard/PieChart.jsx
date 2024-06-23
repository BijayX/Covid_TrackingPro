import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'COVID-19 Distribution',
        data: [data.cases, data.recovered, data.deaths],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">COVID-19 Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
