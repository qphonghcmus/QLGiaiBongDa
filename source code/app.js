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
// upload img
require('./utils/upload')(app);
require('./utils/delete')(app);

// const trandau = require('./models/trandau.model');
// const doibong = require('./models/doibong.model');

// doibong.find().then(succ=>{
//     console.log("danh sách đội bóng: " + succ[1]);
//         let obj11 = {
//             vongDau: 1,
//             doiNha: succ[1-1]._id,
//             doiKhach: succ[5-1]._id,
//         }
//         let obj12 = {
//             vongDau: 1,
//             doiNha: succ[2-1]._id,
//             doiKhach: succ[4-1]._id,
//         }
//         let obj13 = {
//             vongDau: 1,
//             doiNha: succ[3-1]._id,
//             doiKhach: succ[6-1]._id,
//         }

//         let obj21 = {
//             vongDau: 2,
//             doiNha: succ[1-1]._id,
//             doiKhach: succ[6-1]._id,
//         }
//         let obj22 = {
//             vongDau: 2,
//             doiNha: succ[2-1]._id,
//             doiKhach: succ[5-1]._id,
//         }
//         let obj23 = {
//             vongDau: 2,
//             doiNha: succ[3-1]._id,
//             doiKhach: succ[4-1]._id,
//         }

//         let obj31 = {
//             vongDau: 3,
//             doiNha: succ[1-1]._id,
//             doiKhach: succ[2-1]._id,
//         }
//         let obj32 = {
//             vongDau: 3,
//             doiNha: succ[3-1]._id,
//             doiKhach: succ[5-1]._id,
//         }
//         let obj33 = {
//             vongDau: 3,
//             doiNha: succ[4-1]._id,
//             doiKhach: succ[6-1]._id,
//         }

//         let obj41 = {
//             vongDau: 4,
//             doiNha: succ[1-1]._id,
//             doiKhach: succ[3-1]._id,
//         }
//         let obj42 = {
//             vongDau: 4,
//             doiNha: succ[2-1]._id,
//             doiKhach: succ[6-1]._id,
//         }
//         let obj43 = {
//             vongDau: 4,
//             doiNha: succ[4-1]._id,
//             doiKhach: succ[5-1]._id,
//         }

//         let obj51 = {
//             vongDau: 5,
//             doiNha: succ[1-1]._id,
//             doiKhach: succ[4-1]._id,
//         }
//         let obj52 = {
//             vongDau: 5,
//             doiNha: succ[2-1]._id,
//             doiKhach: succ[3-1]._id,
//         }
//         let obj53 = {
//             vongDau: 5,
//             doiNha: succ[5-1]._id,
//             doiKhach: succ[6-1]._id,
//         }
//         trandau.add(obj11).then(succ=>{});
//         trandau.add(obj12).then(succ=>{});
//         trandau.add(obj13).then(succ=>{});
        
//         trandau.add(obj21).then(succ=>{});
//         trandau.add(obj22).then(succ=>{});
//         trandau.add(obj23).then(succ=>{});

//         trandau.add(obj31).then(succ=>{});
//         trandau.add(obj32).then(succ=>{});
//         trandau.add(obj33).then(succ=>{});

//         trandau.add(obj41).then(succ=>{});
//         trandau.add(obj42).then(succ=>{});
//         trandau.add(obj43).then(succ=>{});
        
//         trandau.add(obj51).then(succ=>{});
//         trandau.add(obj52).then(succ=>{});
//         trandau.add(obj53).then(succ=>{});
// })
// .catch(err=>{
//     console.log(err);
// })



// doibong.find().then(succ=>{
//     console.log("danh sách đội bóng: " + succ[1]);
//         let obj11 = {
//             vongDau: 6,
//             doiKhach: succ[1-1]._id,
//             doiNha: succ[5-1]._id,
//         }
//         let obj12 = {
//             vongDau: 6,
//             doiKhach: succ[2-1]._id,
//             doiNha: succ[4-1]._id,
//         }
//         let obj13 = {
//             vongDau: 6,
//             doiKhach: succ[3-1]._id,
//             doiNha: succ[6-1]._id,
//         }

//         let obj21 = {
//             vongDau: 7,
//             doiKhach: succ[1-1]._id,
//             doiNha: succ[6-1]._id,
//         }
//         let obj22 = {
//             vongDau: 7,
//             doiKhach: succ[2-1]._id,
//             doiNha: succ[5-1]._id,
//         }
//         let obj23 = {
//             vongDau: 7,
//             doiKhach: succ[3-1]._id,
//             doiNha: succ[4-1]._id,
//         }

//         let obj31 = {
//             vongDau: 8,
//             doiKhach: succ[1-1]._id,
//             doiNha: succ[2-1]._id,
//         }
//         let obj32 = {
//             vongDau: 8,
//             doiKhach: succ[3-1]._id,
//             doiNha: succ[5-1]._id,
//         }
//         let obj33 = {
//             vongDau: 8,
//             doiKhach: succ[4-1]._id,
//             doiNha: succ[6-1]._id,
//         }

//         let obj41 = {
//             vongDau: 9,
//             doiKhach: succ[1-1]._id,
//             doiNha: succ[3-1]._id,
//         }
//         let obj42 = {
//             vongDau: 9,
//             doiKhach: succ[2-1]._id,
//             doiNha: succ[6-1]._id,
//         }
//         let obj43 = {
//             vongDau: 9,
//             doiKhach: succ[4-1]._id,
//             doiNha: succ[5-1]._id,
//         }

//         let obj51 = {
//             vongDau: 10,
//             doiKhach: succ[1-1]._id,
//             doiNha: succ[4-1]._id,
//         }
//         let obj52 = {
//             vongDau: 10,
//             doiKhach: succ[2-1]._id,
//             doiNha: succ[3-1]._id,
//         }
//         let obj53 = {
//             vongDau: 10,
//             doiKhach: succ[5-1]._id,
//             doiNha: succ[6-1]._id,
//         }
//         trandau.add(obj11).then(succ=>{});
//         trandau.add(obj12).then(succ=>{});
//         trandau.add(obj13).then(succ=>{});
        
//         trandau.add(obj21).then(succ=>{});
//         trandau.add(obj22).then(succ=>{});
//         trandau.add(obj23).then(succ=>{});

//         trandau.add(obj31).then(succ=>{});
//         trandau.add(obj32).then(succ=>{});
//         trandau.add(obj33).then(succ=>{});

//         trandau.add(obj41).then(succ=>{});
//         trandau.add(obj42).then(succ=>{});
//         trandau.add(obj43).then(succ=>{});
        
//         trandau.add(obj51).then(succ=>{});
//         trandau.add(obj52).then(succ=>{});
//         trandau.add(obj53).then(succ=>{});
// })
// .catch(err=>{
//     console.log(err);
// })

app.get('/', require('./routes/index'));
app.use('/baocao', require('./routes/baocao/route.baocao'));
app.use('/player',require('./routes/player/route.player'));
app.use('/fixture',require('./routes/fixture/router.fixture'));
app.use('/result',require('./routes/result/router.result'));
app.use('/dieule',require('./routes/dieule/route.dieule'));
app.use('/club',require('./routes/club/route.club'));
app.use('/season',require('./routes/season/route.season'));

app.listen(3000, () => {
    console.log("Web server is running at port 3000");
});