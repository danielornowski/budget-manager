    import React, { useState } from 'react';
    import axios from 'axios';

    const TransactionForm = ({ fetchTransactions }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !amount || !type) {
        alert('Please fill in all fields!');
        return;
        }

        try {
        
        await axios.post('http://localhost:5001/transactions', {
            description,
            amount: parseFloat(amount), 
            type,
        });

        
        fetchTransactions();

        window.location.reload();

    
        setDescription('');
        setAmount('');
        setType('');
        } catch (error) {
        console.error('Error adding transaction:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
        <div>
            <label>Description</label>
            <input
            className='bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 ml-2 mb-1 rounded-md px-3 py-0.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Amount</label>
            <input
            className='bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 ml-2 rounded-md px-3 py-0.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"'
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Type</label>
            <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            </select>
        </div>
        <button type="submit">Add Transaction</button>
        </form>
    );
    };

    export default TransactionForm;
