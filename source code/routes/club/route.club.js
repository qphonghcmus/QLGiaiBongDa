var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Danh sách đội bóng',
        filename: '../club/list',
        activeDoibong: true,
        cssfiles: [
            '../../public/assets/css/style.logo.css',
        ],
    })
})

router.get('/list', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Danh sách đội bóng',
        filename: '../club/list',
        activeDoibong: true,
        cssfiles: [
            '../../public/assets/css/style.logo.css',
        ],
    })
})

module.exports = router;