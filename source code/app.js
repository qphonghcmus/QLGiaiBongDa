var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+'/'));

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.end('First run');
});

app.listen(3000, () => {
    console.log("Web server is running at port 3000");
});