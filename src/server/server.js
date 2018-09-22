const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.post('/api/beers', controller.create);
app.get('/api/beers', controller.read);
app.put('/api/beers/:id', controller.update);
app.delete('/api/beers/:id', controller.delete);

const port = 8080;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});