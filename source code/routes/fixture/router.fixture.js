var express = require('express');
var router = express.Router();
const trandau = require('../../models/trandau.model');


router.get('/fixture-detail/:id&:seasonID', (req,res) => {
    let idMuaGiai = req.params.seasonID;
    let vong = req.params.id;
    trandau.findByRound(vong).then(succ=>{
        console.log(succ);
        res.render('./layouts/main',{
            trandaus: succ,
            vongtruoc: Number(vong)-1,
            vongdau: vong,
            vongsau:Number(vong)+1,
            chuyenmuc: 'Lịch thi đấu',
            filename: '../fixture/fixture-detail',
            idSeason: idMuaGiai,
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
    .catch(err=>{
        console.log(err);
    })

})

router.get('/add-fixture/:seasonID', (req,res) => {
    let idMuaGiai = req.params.seasonID;
    res.render('./layouts/main',{
        chuyenmuc: 'Lịch thi đấu',
        filename: '../fixture/add-fixture',
        idSeason: idMuaGiai,
        activeLichthidau: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker-standalone.css',
        ],
        jsfiles: [
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
        ]
    })
})


module.exports = router;