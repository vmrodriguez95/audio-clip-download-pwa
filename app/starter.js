const express = require('express');
const router = require('./router');
const app = express();

app.use(express.static('public'));

app.use('/', router);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});