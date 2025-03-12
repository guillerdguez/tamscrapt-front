const express = require('express');
const path = require('path');

const app = express();

// Toma el puerto desde Railway (o usa 4000 por defecto)
const port = process.env.PORT || 4000;

// Ruta absoluta a la carpeta dist/Tamscrap
const distFolder = path.join(__dirname, 'dist', 'Tamscrap');

// Servir contenido estático
app.use(express.static(distFolder));

// Para cualquier ruta no estática, devolver index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Angular sin SSR escuchando en el puerto ${port}`);
});
