const express = require('express');
const app = express();
const PORT = 9876;

const numbersRoute = require('../routes/numbersRoute');

app.use('/', numbersRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});