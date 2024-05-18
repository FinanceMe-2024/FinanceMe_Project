const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const axios = require('axios'); // Importa Axios para hacer solicitudes HTTP
const app = express();
const userRoutes = require('./routes/users');

require('dotenv').config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));
app.use('/api/user', userRoutes);

// Nuevo endpoint para obtener recomendaciones financieras
app.post('/api/v1/getFinancialRecommendations', async (req, res) => {
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
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('listening to port:', PORT);
  });
};

server();
