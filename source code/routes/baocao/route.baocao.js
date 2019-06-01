var express = require('express');
var router = express.Router();

router.get('/bxh', (req,res) => {
    console.log('debug');
    res.render('./layouts/main',{
        chuyenmuc: 'Bảng xếp hạng',
        filename: '../baocao/bxh',
        activeBaocao: true,
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

router.get('/ghiban', (req,res) => {
    console.log('debug');
    res.render('./layouts/main',{
        chuyenmuc: 'Top ghi bàn',
        filename: '../baocao/ghiban',
        activeBaocao: true,
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

router.get('/kientao', (req,res) => {
    console.log('debug');
    res.render('./layouts/main',{
        chuyenmuc: 'Top kiến tạo',
        filename: '../baocao/kientao',
        activeBaocao: true,
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

module.exports = router;