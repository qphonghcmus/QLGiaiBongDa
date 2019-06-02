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
        jsfiles:[]
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
        jsfiles:[]
    })
})

router.get('/add', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Đăng ký đội bóng',
        filename: '../club/add',
        activeDoibong: true,
        cssfiles: [
            '../../public/vendors/chosen/chosen.min.css',
        ],
        jsfiles:[
            '../../public/vendors/chosen/chosen.jquery.min.js',
            '../../public/assets/js/multiple.select.js'
        ]
    })
})

router.get('/info/:club', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Thông tin đội bóng',
        filename: '../club/club',
        activeDoibong: true,
        cssfiles: [
            '../../public/assets/css/style.logo.css',
        ],
        jsfiles:[
        ]
    })
})

module.exports = router;