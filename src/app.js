const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Middleware imports
const errorHandler = require('./middlewares/errorHandler');

// Routes imports
const userRoutes = require('./routes/userRoutes');
const claudeRoutes = require('./routes/claudeRoutes');

const app = express();

// CORS
const corsOptions = {
  origin: 'http://your-frontend-domain.com',
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claude', claudeRoutes);
app.get('/', (req, res) => {
  res.send('jfilipiak api helper, nodeenv: ' + process.env.NODE_ENV);
});

// Error Handler
app.use(errorHandler);

module.exports = app;
