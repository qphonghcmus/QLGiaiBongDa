var express = require('express');
var router = express.Router();

router.get('/result-detail/:seasonID', (req,res) => {
    let idMuaGiai = req.params.seasonID;
    res.render('./layouts/main',{
        chuyenmuc: 'Kết quả thi đấu',
        filename: '../result/result-detail',
        idSeason: idMuaGiai,
        activeKetqua: true,
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

router.get('/add-result/:seasonID', (req,res) => {
    let idMuaGiai = req.params.seasonID;
    res.render('./layouts/main',{
        chuyenmuc: 'Cập nhật kết qủả thi đấu',
        filename: '../result/add-result',
        idSeason: idMuaGiai,
        activeKetqua: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
        ],
        jsfiles: [
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            '../../public/assets/js/script.js'
        ]
    })
})

module.exports = router;