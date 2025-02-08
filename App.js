import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import BudgetOverview from './components/BudgetOverview';
import ChartComponent from './components/ChartComponent';
import TransactionList from './components/TransactionList'; // Komponent do listy transakcji
import axios from 'axios';

const App = () => {
  const [activeTab, setActiveTab] = useState('form'); 
  const fetchTransactions = () => {
    
  };

  const resetApp = async () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      await axios.post('http://localhost:5001/reset');
      window.location.reload(); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Budget Manager</h1>

      
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('form')}
          className={`mr-4 ${activeTab === 'form' ? 'font-bold' : ''}`}
        >
          Add Transaction
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`mr-4 ${activeTab === 'transactions' ? 'font-bold' : ''}`}
        >
          All Transactions
        </button>
      </div>

      
      {activeTab === 'form' && (
        <>
          <TransactionForm fetchTransactions={fetchTransactions} />
          <BudgetOverview />
          <ChartComponent />
        </>
      )}
      {activeTab === 'transactions' && <TransactionList />}

      
      <button
        onClick={resetApp}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
      >
        Reset Application
      </button>
    </div>
  );
};

export default App;

