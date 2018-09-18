var express = require('express');
var app = express();

let port = process.env.PORT || 4000;

app.get('/api/test', (req, res) => {
  let object = {
    test: 'testing api server3'
  };
  res.json(object);
});

app.listen(port, () => console.log(`API server running at ${port}`));
