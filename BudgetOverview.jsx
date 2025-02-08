import { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetOverview = () => {
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchBudget = async () => {
      const res = await axios.get('http://localhost:5001/budget');
      setBudget(res.data);
    };

    fetchBudget();
  }, []);

  return (
    <div>
      <h2 className="text-xl">Current Budget: ${budget}</h2>
    </div>
  );
};

export default BudgetOverview;
