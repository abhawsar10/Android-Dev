const express = require('express');
const path = require('path');
var cors = require('cors');
var endpoints = require('./routes/endpoints');

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname,'dist/ang-frontend')));

app.use('/apis/endpoints',endpoints);

app.use('/*',function(req, res){
    res.sendFile(path.join(__dirname + '/dist/ang-frontend/index.html'));
})





const hostname = '127.0.0.1';
const port = 8080;

app.listen(port, () => {
    console.log(`Server walking at http://${hostname}:${port}/`)
  })


  
module.exports = app;