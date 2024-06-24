const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTracker',
     { useNewUrlParser: true, 
        useUnifiedTopology: true ,
    });

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) =>
     {
    res.render('index');
});


// Define a schema
const transactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API routes
app.post('/api/transactions', async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    await transaction.save();
    res.status(201).send(transaction);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find({});
  res.send(transactions);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});