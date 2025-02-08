const db = require('../db');

const getAllTransactions = (req, res) => {
  db.all('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error fetching transactions');
    }
    res.json(rows);
  });
};

const addTransaction = (req, res) => {
  const { description, amount, type } = req.body;


  if (!description || typeof amount !== 'number' || !type) {
    console.log('Invalid data received:', req.body);
    return res.status(400).send('Invalid data');
  }

  const query = 'INSERT INTO transactions (description, amount, type, date) VALUES (?, ?, ?, ?)';
  const params = [description, amount, type, new Date().toISOString()];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error adding transaction');
    }
    res.status(201).send({ id: this.lastID });
  });
};

module.exports = { getAllTransactions, addTransaction };
