var express = require('express');
var router = express.Router();


router.get('/fixture-detail', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Lịch thi đấu',
        filename: '../fixture/fixture-detail',
        activeLichthidau: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
        ],
        jsfiles: [
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
        ]
    })
})

router.get('/add-fixture', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Lịch thi đấu',
        filename: '../fixture/add-fixture',
        activeLichthidau: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
        ],
        jsfiles: [
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
        ]
    })
})


module.exports = router;