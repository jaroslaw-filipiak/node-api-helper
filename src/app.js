const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('jfilipiak api helper');
});

// Error Handler
app.use(errorHandler);

module.exports = app;
