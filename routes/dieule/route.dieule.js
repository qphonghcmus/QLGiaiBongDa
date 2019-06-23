var express = require('express');
var router = express.Router();
var thamso = require('../../models/thamso.model')

router.get('/edit/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    res.render('./layouts/main', {
        chuyenmuc: 'Thay đổi quy định',
        filename: '../dieule/edit',
        idSeason: idMuaGiai,
        activeDieule: true,
        cssfiles: [
            '../../public/vendors/chosen/chosen.min.css',
        ],
        jsfiles: [
            '../../public/vendors/chosen/chosen.jquery.min.js',
            '../../public/assets/js/multiple.select.js'
        ]
    })
})

router.get('/info/:seasonID&:edit', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let edit = req.params.edit;

    thamso.findByIdMuaGiai(idMuaGiai)
        .then(succ => {
            res.render('./layouts/main', {
                edit: edit,
                quydinh: succ,
                chuyenmuc: 'Xem quy định',
                filename: '../dieule/edit',
                activeDieule: true,
                idSeason: idMuaGiai,
                cssfiles: [
                    '../../public/vendors/chosen/chosen.min.css',
                ],
                jsfiles: [
                    '../../public/vendors/chosen/chosen.jquery.min.js',
                    '../../public/assets/js/multiple.select.js'
                ]
            })
        }).catch()
})

router.post('/update/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    var obj = {
        idMuaGiai: idMuaGiai,
        tuoiMin: req.body.tuoiMin,
        tuoiMax: req.body.tuoiMax,
        soCauThuMin: req.body.cauthuMin,
        soCauThuMax: req.body.cauthuMax,
        soNgoaiBinhMax: req.body.ngoaibinhMax,
        soPhutBuGioMax: req.body.bugioMax,
        diemSoThang: req.body.diemthang,
        diemSoHoa: req.body.diemhoa,
        diemSoThua: req.body.diemthua,
        thuTuUuTien: req.body.thutu,
        soDoiXuongHang: req.body.sodoixuonghang,
        soDoiDuC1: req.body.sodoiduC1,
        soDoiDuC2: req.body.sodoiduC2,
        soDoiThamDu: req.body.soDoiThamDu
    }

    thamso.updateAll(obj)
        .then(succ => {
            res.redirect('/dieule/info/'+ idMuaGiai + '&false');
        }).catch()
})

module.exports = router;