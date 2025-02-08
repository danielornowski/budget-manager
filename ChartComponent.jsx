import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = () => {
  const [data, setData] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await axios.get('http://localhost:5001/budget-breakdown');
      setData(res.data);
    };

    fetchChartData();
  }, []);

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Budget Breakdown',
        data: [data.income, data.expense],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl text-center mb-4">Budget Breakdown</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
