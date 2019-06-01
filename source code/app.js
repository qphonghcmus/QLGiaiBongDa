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

app.get('/', require('./routes/index'));
app.use('/baocao', require('./routes/baocao/route.baocao'));
app.use('/player',require('./routes/player/route.player'));
app.use('/fixture',require('./routes/fixture/router.fixture'));
app.use('/result',require('./routes/result/router.result'));
app.use('/dieule',require('./routes/dieule/route.dieule'));

app.listen(3000, () => {
    console.log("Web server is running at port 3000");
});