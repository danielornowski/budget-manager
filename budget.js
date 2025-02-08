const db = require('../db');

const getBudget = (req, res) => {
  db.get('SELECT SUM(amount) AS total FROM transactions WHERE type="income"', (err, row) => {
    if (err) throw err;
    const totalIncome = row.total || 0;
    db.get('SELECT SUM(amount) AS total FROM transactions WHERE type="expense"', (err, row) => {
      if (err) throw err;
      const totalExpense = row.total || 0;
      res.json(totalIncome - totalExpense);
    });
  });
};

const getBudgetBreakdown = (req, res) => {
  db.get('SELECT SUM(amount) AS total FROM transactions WHERE type="income"', (err, incomeRow) => {
    if (err) throw err;
    const income = incomeRow.total || 0;

    db.get('SELECT SUM(amount) AS total FROM transactions WHERE type="expense"', (err, expenseRow) => {
      if (err) throw err;
      const expense = expenseRow.total || 0;

      res.json({ income, expense });
    });
  });
};

module.exports = { getBudget, getBudgetBreakdown };
