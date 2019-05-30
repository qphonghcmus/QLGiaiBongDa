var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+'/'));
app.use(express.static('public'));

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// db connection
require('./utils/db.connection');

app.get('/', (req,res) => {
    // res.render('./layouts/main.ejs');
});

app.listen(3000, () => {
    console.log("Web server is running at port 3000");
});