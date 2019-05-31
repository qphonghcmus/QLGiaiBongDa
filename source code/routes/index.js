var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Trang chủ',
        filename: '../home',
        activeAdmin: true
    })
})

module.exports = router;