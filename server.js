var express = require('express');
var app = express();

let port = process.env.PORT || 4000;

app.get('/api/test', (req, res) => {
  res.send({test : 'testing api server'});
});

app.listen(port, () => console.log(`API server running at ${port}`));
