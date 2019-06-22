var express = require('express');
var router = express.Router();

const player = require('../../models/cauthu.model');
const club = require('../../models/doibong.model');
const thongke = require('../../models/thongkecauthu.model');

var messagesSuccess = "";
router.get('/lookup/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    
    thongke.thongkeCauthu(idMuaGiai).then(succ => {
        res.render('./layouts/main', {
        danhsachcauthu : succ,
        chuyenmuc: 'Tra cứu cầu thủ',
        filename: '../player/players-detail',
        idSeason: idMuaGiai,
        activeCauthu: true,
        cssfiles: [
            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
        ],
        jsfiles: [
            'https://code.jquery.com/jquery-3.3.1.min.js',
            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            '../../public/assets/js/datatable.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
        ]
    })
    })
    .catch(err=>{
        log.console("yyyyy"+err);
    });
})

router.get('/add/:seasionID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    club.find().then(succ=>{
        res.render('./layouts/main', {
            danhsachdoibong: succ,
            chuyenmuc: 'Đăng ký cầu thủ',
            filename: '../player/add-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
            cssfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
    
            ],
            jsfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                '../../public/assets/js/add.player.validation.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                '../../public/assets/js/upload.img.js',            
            ],
            success: false,
        })
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/add/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let entity = req.body;
    player.add(entity)
        .then(succ => {
            var messagesSuccess = "Đã thêm cầu thủ  \" " + succ.tenCauThu + " \" thành công";

            club.find().then(succ=>{
                res.render('./layouts/main', {
                    danhsachdoibong: succ,
                    chuyenmuc: 'Đăng ký cầu thủ',
                    filename: '../player/add-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
                    cssfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
            
                    ],
                    jsfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                        '../../public/assets/js/add.player.validation.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                        '../../public/assets/js/upload.img.js',            
                    ],
                    success: true ,
                    messagesSuccess: messagesSuccess
                })
            })
            .catch(err=>{
                console.log(err)
            })

            // res.render('./layouts/main', {
            //     chuyenmuc: 'Đăng ký cầu thủ',
            //     filename: '../player/add-player',
            //     activeCauthu: true,
            //     cssfiles: [
            //     ],
            //     jsfiles: [
            //     ],
            //     messagesSuccess : messagesSuccess,
            //     success : messagesSuccess.length,
            // })
            
        })
        .catch(err => {
            console.log(err);
        });


})

router.get('/edit/:id&:seasonID',(req,res)=>{
    let idMuaGiai = req.params.seasonID;
    var id = req.params.id;

    var p1 = club.find();
    var p2 = player.findById(id);
    var p3 = thongke.findByCauThu(id);

    Promise.all([p1,p2,p3]).then(values => {
        console.log(values[1][0])
        res.render('./layouts/main', {
            danhsachdoibong: values[0],
            cauthu: values[1][0],
            thongke: values[2][0],
            chuyenmuc: 'Cập nhật cầu thủ',
            filename: '../player/edit-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
            cssfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
    
            ],
            jsfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                '../../public/assets/js/add.player.validation.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                '../../public/assets/js/upload.img.js',            
            ],
            success: false,
        })
    })

})

router.post('/edit/:id&:seasonID',(req,res)=>{
    let idMuaGiai = req.params.seasonID;
    var id = req.params.id;
    var obj = {
        idCauThu: id,
        tenCauThu: req.body.tenCauThu,
        loaiCauThu: req.body.loaiCauThu,
        quocTich: req.body.quocTich,
        ngaySinh: req.body.dob,
        soBanThang: req.body.sobanthang,
        soKienTao: req.body.sokientao,
        soTheDo: req.body.sothedo,
        soTheVang: req.body.sothevang,
        viTriThiDau: req.body.viTriThiDau,
        doiBong: req.body.doiBong,
    }

    var thongke_obj = {
        idMuaGiai: idMuaGiai,
        idCauThu: id,
        soBanThang: req.body.sobanthang,
        soKienTao: req.body.sokientao,
        soTheVang: req.body.sothevang,
        soTheDo: req.body.sothedo
    }

    Promise.all([
        player.update(obj),
        thongke.findAndUpdate(thongke_obj),
    ]).then(values => {
        res.redirect('/player/lookup/'+idMuaGiai)
    }).catch()

    player.update(obj).then(succ => {
        res.redirect('/player/lookup/'+idMuaGiai)
    }).catch()
})


module.exports = router;