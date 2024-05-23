const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const { execFile } = require('child_process'); 
const axios = require('axios'); // Importa Axios para hacer solicitudes HTTP
const app = express();
const userRoutes = require('./routes/users');
const { HfInference } = require("@huggingface/inference");
const inference = new HfInference(process.env.HUGGING_FACE_API_KEY);

require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));
app.use('/api/user', userRoutes);

app.post('/api/v1/getFinancialRecommendations', async (req, res) => {
  const { balance } = req.body;
  const prompt = `
  You are a financial advisor. Given a balance of $${balance}, recommend specific financial actions that the user should take. Consider the following:
  - Savings and investment strategies
  - Risk management
  - Short-term and long-term financial goals
  - Any potential market conditions
  Please provide detailed and actionable recommendations.
  `;

  try {
    const response = await inference.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const recommendation = response.choices[0].message.content.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/v1/getIncomeRecommendations', async (req, res) => {
  const { income } = req.body;
  const prompt = `
  You are a financial advisor. Given an incomes of $${income}, recommend specific financial actions that the user should take. Consider the following:
  - Savings and investment strategies
  - Risk management
  - Short-term and long-term financial goals
  - Any potential market conditions
  Please provide detailed and actionable recommendations.
  `;

  try {
    const response = await inference.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const recommendation = response.choices[0].message.content.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/v1/getExpenseRecommendations', async (req, res) => {
  const { expense } = req.body;
  const prompt = `
  You are a financial advisor. Given an expense of $${expense}, recommend specific financial actions that the user should take. Consider the following:
  - Savings and investment strategies
  - Risk management
  - Short-term and long-term financial goals
  - Any potential market conditions
  Please provide detailed and actionable recommendations.
  `;

  try {
    const response = await inference.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const recommendation = response.choices[0].message.content.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Nuevo endpoint para obtener recomendaciones financieras
/*app.post('/api/v1/getFinancialRecommendations', async (req, res) => {
  const { balance } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'GPT-2', // Modelo de OpenAI
      prompt: `Given a balance of ${balance}, recommend financial actions.`,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Clave de API de OpenAI
        'Content-Type': 'application/json'
      }
    });

    const recommendation = response.data.choices[0].text.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('Error:', error);
    console.error('Error data:', error.response.data); // Imprimir el objeto de error completo
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('listening to port:', PORT);
  });
};

server();
