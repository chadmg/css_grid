var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');

var sassMiddleware = require('node-sass-middleware');


app.set('view engine', 'ejs');
app.set('view options', { layout: false });


app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, '/sass'),
    dest: path.join(__dirname, '/public'),
    debug: true,
    force: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(process.env.PORT || 3000);
console.log("Listening on port: " + (process.env.PORT || 3000));