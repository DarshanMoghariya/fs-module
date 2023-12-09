const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes/index');

app.use(express.json());
app.use('/api',route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})