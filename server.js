const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transactionsController = require('./controllers/transactions');
const budgetController = require('./controllers/budget');


const db = require('./db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, description TEXT, amount REAL, type TEXT, date TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS budget (amount REAL)");
});


app.get('/transactions', transactionsController.getAllTransactions);
app.post('/transactions', transactionsController.addTransaction);

app.get('/budget', budgetController.getBudget);
app.get('/budget-breakdown', budgetController.getBudgetBreakdown);


app.post('/reset', (req, res) => {
    db.serialize(() => {
      db.run('DELETE FROM transactions', (err) => {
        if (err) return res.status(500).send('Error resetting transactions');
      });
      db.run('DELETE FROM budget', (err) => {
        if (err) return res.status(500).send('Error resetting budget');
      });
    });
    res.status(200).send('Application reset successful');
});



app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
