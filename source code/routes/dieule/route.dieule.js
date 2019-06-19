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
                quydinh: succ[0],
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

module.exports = router;