import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/transactions');
      console.log('Transactions fetched:', response.data); 
      setTransactions(response.data); 
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTransactions(); 
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">All Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 italic">No transactions found</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`flex justify-between items-center py-3 px-4 rounded-md shadow-sm ${
                transaction.type === 'income'
                  ? 'bg-green-50 hover:bg-green-100'
                  : 'bg-red-50 hover:bg-red-100'
              }`}
            >
              <div className="text-gray-800">
                <p className="font-medium">
                  {transaction.description}
                </p>
                <p
                  className={`text-sm ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type}
                </p>
              </div>
              <span
                className={`text-lg font-semibold ${
                  transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {transaction.type === 'income'
                ? `+${transaction.amount}`
                : `-${transaction.amount}`}
            </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TransactionList;
