const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.post('/api/zoho/contacts', async (req, res) => {
  // LOG BODY Y HEADERS PARA DEPURAR
  console.log('BODY recibido en proxy:', JSON.stringify(req.body, null, 2));
  console.log('Headers recibidos:', req.headers);

  // VALIDACIÓN: el header debe existir y tener formato correcto
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Zoho-oauthtoken')) {
    return res.status(400).json({ error: 'Authorization header missing or malformed' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const zohoResponse = await axios.post(
      'https://www.zohoapis.com/crm/v8/Contacts',
      req.body,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Respuesta de Zoho:', zohoResponse.data);
    res.json(zohoResponse.data);
  } catch (err) {
    // LOGUEA a consola todo el error real
    console.error('Error al enviar a Zoho:', err.response?.status, err.response?.data);

    // Devuelve status y mensaje real de Zoho si está disponible, si no 500
    if (err.response) {
      res.status(err.response.status).json({
        error: (typeof err.response.data==='string') ? err.response.data : JSON.stringify(err.response.data)
      });
    } else {
      res.status(500).json({ error: err.toString() });
    }
  }
});

app.listen(3000, () => console.log('Proxy escuchando en 3000'));