const express = require('express');
const cors = require('cors');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/UserController');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

router.get('/test-auth', cors(corsOptions), (req, res) => {
  // Only show the first few and last few characters of the API key
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  const maskedKey =
    apiKey.length > 8
      ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
      : 'not found';

  res.json({
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    apiKeyFormat: apiKey.startsWith('sk-ant-api'),
    apiKeyPreview: maskedKey,
  });
});

router.post('/', cors(corsOptions), async (req, res) => {
  try {
    console.log('Claude API Request:', req.body);

    const { model, messages, max_tokens } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens,
      }),
    });

    console.log('Claude API Response:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({
      message:
        error.message || 'An error occurred while processing your request',
    });
  }
});

module.exports = router;
