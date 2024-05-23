/*app.js*/
const express = require('express');

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/', (req, res) => {
  res.send("hello world!");
  console.log(`Hit homepage`);
});

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
  console.log(`Hit rolldice`);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
