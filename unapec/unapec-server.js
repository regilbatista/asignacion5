const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/nomina', (req, res) => {
  const data = fs.readFileSync('nomina.json');
  res.json(JSON.parse(data));
});

app.listen(3000, () => {
  console.log("Servidor UNAPEC escuchando en http://localhost:3000");
});

