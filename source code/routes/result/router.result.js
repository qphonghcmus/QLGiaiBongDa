var express = require('express');
var router = express.Router();

router.get('/result-detail', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Kết quả thi đấu',
        filename: '../result/result-detail',
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

module.exports = router;