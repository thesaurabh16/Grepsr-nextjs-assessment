import React from 'react';
import Link from 'next/link';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
    if (!data || Object.keys(data).length ==0){
        return <div>no data available for the pie chart.</div>
    }
    // category1: value1,
    // category2: value2,

//   <PieChart data={data} />
const fetchData = async () => {
    try {
      const response = await fetch('https://example.com/api/data');
      const data = await response.json();
      console.log('Fetched data:', data);
  
      // Pass data to PieChart component
      // <PieChart data={data} />
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PieChart;
