const express = require('express');
const cors = require('cors');
const router = express.Router();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

router.post('/', cors(corsOptions), async (req, res) => {
  try {
    console.log('Claude API Request started');
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

    console.log('Claude API Response status:', response.status);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Claude API Response received successfully');
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
