var express = require('express');
var router = express.Router();
var muagiai = require('../models/muagiai.model');

router.get('/', (req,res) => {
    muagiai.find().then(succ => {
        console.log(succ);
        res.render('./home/home',{
            chuyenmuc: 'Trang chủ',
            filename: '../home',
            activeAdmin: true,
            listSeason: succ
        })
    }).catch(err => console.log(err))
   
})


module.exports = router;