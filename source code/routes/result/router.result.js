var express = require('express');
var router = express.Router();
const trandau = require('../../models/trandau.model');
const vongdau = require('../../models/vongdau.model');
router.get('/result-detail/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let vong = req.query.vong || 1;
    
    Promise.all([
        vongdau.findVongMotMuaGiai(vong,idMuaGiai),
        vongdau.countSoVong(idMuaGiai),
    ]).then(values => {
        res.render('./layouts/main', {
            trandaus: values[0].DsTranDau,
            vongtruoc: Number(vong) - 1,
            vonghientai: Number(vong),
            vongsau: Number(vong) + 1,
            chuyenmuc: 'Kết quả thi đấu',
            filename: '../result/result-detail',
            idSeason: idMuaGiai,activeKetqua: true,
            DsVong: values[1],
            cssfiles: [
                '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            ],
            jsfiles: [
                '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                '../../public/assets/js/script.js',
                '../../public/assets/js/ketqua.trandau.js'
            ]
        })
    }).catch()
})

router.get('/add-result/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let vong = req.query.vong || 1;
    
    Promise.all([
        vongdau.findVongMotMuaGiai(vong,idMuaGiai),
        vongdau.countSoVong(idMuaGiai),
    ]).then(values => {
        res.render('./layouts/main', {
            trandaus: values[0].DsTranDau,
            vongtruoc: Number(vong) - 1,
            vonghientai: Number(vong),
            vongsau: Number(vong) + 1,
            chuyenmuc: 'Cập nhật kết quả thi đấu',
            filename: '../result/add-result',
            idSeason: idMuaGiai, activeKetqua: true,
            DsVong: values[1],
            cssfiles: [
                '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            ],
            jsfiles: [
                '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                '../../public/assets/js/script.js',
                '../../public/assets/js/ketqua.trandau.js'
            ]
        })
    }).catch()
})

router.post('/add-result/:id&:seasonID', (req, res) => {

    let idMuaGiai = req.params.seasonID;
    let vong = req.params.id;
    var obj = {
        idTranDau: req.body.trandau,
        banthangDoiNha: req.body.banthanghome, 
        banthangDoiKhach: req.body.banthangaway,
        theVangDoiNha: req.body.thevanghome, 
        theDoDoiNha: req.body.thedohome,
        theDoDoiKhach: req.body.thedoaway, 
        theVangDoiKhach: req.body.thevangaway
    }
    console.log(obj)
    trandau.updateStat(obj).then(trandau => {
        res.redirect('/result/add-result/'+idMuaGiai + '?vong=' + vong);
    }).catch()
})

module.exports = router;