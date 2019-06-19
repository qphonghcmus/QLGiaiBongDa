var express = require('express');
var router = express.Router();

const club = require('../../models/doibong.model')
const player = require('../../models/cauthu.model')

router.get('/:seasonID', (req, res) => {

    let idMuaGiai = req.params.seasonID;
    club.find().then(succ => {
        console.log(succ);
        res.render('./layouts/main', {
            edit: false,
            danhsachdoibong: succ,
            chuyenmuc: 'Danh sách đội bóng',
            filename: '../club/list',
            idSeason: idMuaGiai,
            activeDoibong: true,
            cssfiles: [
                '../../public/assets/css/style.logo.css',
            ],
            jsfiles: []
        })

    })
        .catch(err => {
            console.log(err);
        })
})

router.get('/list/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;

    club.find().then(succ => {

        console.log(succ);

        res.render('./layouts/main', {
            edit: false,
            danhsachdoibong: succ,
            chuyenmuc: 'Danh sách đội bóng',
            filename: '../club/list',
            idSeason: idMuaGiai,
            activeDoibong: true,
            cssfiles: [
                '../../public/assets/css/style.logo.css',
            ],
            jsfiles: []
        })

    })
        .catch(err => {
            console.log(err);
        })


})

router.get('/add/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    res.render('./layouts/main', {
        chuyenmuc: 'Đăng ký đội bóng',
        filename: '../club/add',
        idSeason: idMuaGiai,
        activeDoibong: true,
        cssfiles: [
            '../../public/vendors/chosen/chosen.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
        ],
        jsfiles: [
            '../../public/vendors/chosen/chosen.jquery.min.js',
            '../../public/assets/js/multiple.select.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
            '../../public/assets/js/club.img.upload.js',
        ],
        success: false,
    })
})

router.post('/add/:seasonID', (req, res) => {

    let idMuaGiai = req.params.seasonID;
    let entity = req.body;

    club.add(entity)
        .then(succ => {
            const messagesSuccess = "Đã thêm đội bóng  \" " + entity.tendoibong + " \" thành công";
            res.render('./layouts/main', {
                chuyenmuc: 'Đăng ký đội bóng',
                filename: '../club/add',
                idSeason: idMuaGiai,
                activeDoibong: true,
                cssfiles: [
                    '../../public/vendors/chosen/chosen.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
                ],
                jsfiles: [
                    '../../public/vendors/chosen/chosen.jquery.min.js',
                    '../../public/assets/js/multiple.select.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                    '../../public/assets/js/club.img.upload.js',
                ],
                success: true,
                messagesSuccess: messagesSuccess

            })
        })
        .catch(err => {
            console.log(err);
        });
})

router.get('/info/:clubID&:edit&:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;

    let clubID = req.params.clubID;

    let edit = req.params.edit;


    club.findById(clubID)
        .then(succ => {
            console.log(succ);
            player.findByClub(clubID).then(listPlayer => {
                console.log(listPlayer);
                res.render('./layouts/main', {
                    danhsachcauthu: [],
                    cauthubienche: listPlayer,
                    idSeason: idMuaGiai,
                    edit: edit,
                    thongtindoibong: succ,
                    chuyenmuc: 'Thông tin đội bóng',
                    filename: '../club/club',
                    activeDoibong: true,
                    cssfiles: [
                        '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',

                        '../../public/assets/css/style.logo.css',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                        '../../public/vendors/chosen/chosen.min.css',
                    ],
                    jsfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',//
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                        '../../public/assets/js/club/edit.club.js',
                        '../../public/vendors/chosen/chosen.jquery.min.js',//
                        '../../public/assets/js/multiple.select.js',//

                        '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                        '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                        '../../public/assets/js/datatable.js',
                    ]
                })
            })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/info/update/:id&:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;

    let id = req.params.id;

    let entity = req.body;

    let redirect = '/club/info/' + id + "&false" + "&" + idMuaGiai;

    console.log(entity);

    club.findByIdAndUpdate(entity, id)
        .then(succ => {
            console.log(succ);
            res.redirect(redirect);
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;