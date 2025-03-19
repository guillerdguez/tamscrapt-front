const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 4000;

const distFolder = path.join(__dirname, "dist", "Tamscrap", "browser");

app.use(express.static(distFolder));

app.get("*", (req, res) => {
  res.sendFile(path.join(distFolder, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor Angular sin SSR escuchando en el puerto ${port}`);
});
