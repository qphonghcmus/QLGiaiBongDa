var express = require('express');
var router = express.Router();

router.get('/lookup', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Tra cứu cầu thủ',
        filename: '../player/players-detail',
        activeCauthu: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
        ],
        jsfiles: [
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            '../../public/assets/js/datatable.js'
        ]
    })
})

router.get('/add', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Đăng ký cầu thủ',
        filename: '../player/add-player',
        activeCauthu: true,
        cssfiles: [
        ],
        jsfiles: [
        ]
    })
})

module.exports = router;