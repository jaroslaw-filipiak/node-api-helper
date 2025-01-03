const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const router = express.Router();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

router.get('/', cors(corsOptions), (req, res) => {
  res.json({
    message: 'Node helper API routes / claude',
  });
});

// router.post('/', cors(corsOptions), async (req, res) => {
//   console.log('Claude API Request started');
//   try {
//     console.log('Claude API Request started');
//     const { model, messages, max_tokens } = req.body;

//     console.log('Claude API Request received:', req.body);
//     console.log('Claude API Request model:', model);
//     console.log('Claude API Request messages:', messages);
//     console.log('Claude API Request max_tokens:', max_tokens);

//     const response = await fetch('https://api.anthropic.com/v1/messages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': process.env.ANTHROPIC_API_KEY,
//         'anthropic-version': '2023-06-01',
//       },
//       body: JSON.stringify({
//         model,
//         messages,
//         max_tokens,
//       }),
//     });

//     console.log('Claude API Response status:', response.status);

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Claude API Response received successfully');

//     console.log('Claude API Response:', data);
//     res.json(data);
//   } catch (error) {
//     console.error('Claude API Error:', error);
//     res.status(500).json({
//       message:
//         error.message || 'An error occurred while processing your request',
//     });
//   }
// });

router.post('/', cors(corsOptions), async (req, res) => {
  try {
    const { model, messages, max_tokens } = req.body;
    console.log('Claude API Request:', { model, messages, max_tokens });

    const response = await anthropic.messages.create({
      model,
      messages,
      max_tokens,
    });

    console.log('Claude API Response received');
    res.json(response);
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(error.status || 500).json({
      message:
        error.message || 'An error occurred while processing your request',
    });
  }
});

module.exports = router;
