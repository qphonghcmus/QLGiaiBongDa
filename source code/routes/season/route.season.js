var express = require('express');
var router = express.Router();
var muagiai = require('../../models/muagiai.model');
var doibong = require('../../models/doibong.model');

router.get('/add', (req, res, next) => {
    res.render('./layouts/main', {
        chuyenmuc: 'Tạo hồ sơ giải đấu',
        filename: '../season/add',
        activeAdmin: true,
        cssfiles: [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
        ],
        jsfiles: [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
            '../../public/assets/js/season/add.season.validation.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
            '../../public/assets/js/season/upload.cover.js',
        ],
        success: false,
    })
})

router.post('/add', (req, res, next) => {
    var xuonghang = [];
    req.body.xuongHang.split(",").forEach(element => {
        xuonghang.push(Number(element));
    });;
    var duC1 = [];
    req.body.duC1.split(",").forEach(element => {
        duC1.push(Number(element));
    });;
    var duC2 = [];
    req.body.duC2.split(",").forEach(element => {
        duC2.push(Number(element));
    });;
    var obj = {
        tenMuaGiai: req.body.tenMuaGiai,
        ngayBatDau: req.body.dateStart,
        ngayKetThuc: req.body.dateEnd,
        viTriXuongHang: xuonghang,
        viTriDuC1: duC1,
        viTriDuC2: duC2,
        cover: req.body.imgPath,
        dsDoiBong: [],
    }

    muagiai.add(obj)
        .then(succ => {
            const messagesSuccess = "Đã tạo hồ sơ mùa giải  \" " + obj.tenMuaGiai + " \" thành công";
            res.render('./layouts/main', {
                chuyenmuc: 'Tạo hồ sơ giải đấu',
                filename: '../season/add',
                activeAdmin: true,
                cssfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
                ],
                jsfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                    '../../public/assets/js/season/add.season.validation.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                    '../../public/assets/js/season/upload.cover.js',
                ],
                success: true,
                messagesSuccess: messagesSuccess

            })
        }).catch(err => {
            console.log(err)
        })
})

router.get('/info/:seasonID&:edit', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let edit = req.params.edit;

    muagiai.findById(idMuaGiai)
        .then(succ => {
            var xuonghang = "";
            succ[0].viTriXuongHang.forEach(e => {
                if (xuonghang === "")
                    xuonghang = e;
                else
                    xuonghang += "," + e;
            })
            var duC1 = "";
            succ[0].viTriDuC1.forEach(e => {
                if (duC1 === "")
                    duC1 = e;
                else
                    duC1 += "," + e;
            })
            var duC2 = "";
            succ[0].viTriDuC2.forEach(e => {
                if (duC2 === "")
                    duC2 = e;
                else
                    duC2 += "," + e;
            })

            var allclubs = [];
            if(edit === "true"){
                doibong.find().then(clubs =>{
                    allclubs = clubs;
                    var season = {
                        idMuaGiai: succ[0].idMuaGiai,
                        tenMuaGiai: succ[0].tenMuaGiai,
                        ngayBatDau: succ[0].ngayBatDau,
                        ngayKetThuc: succ[0].ngayKetThuc,
                        soDoiThamDu: succ[0].soDoiThamDu,
                        viTriXuongHang: xuonghang,
                        viTriDuC1: duC1,
                        viTriDuC2: duC2,
                        dsDoiBong: succ[0].dsDoiBong,
                        dsVongDau: succ[0].dsVongDau,
                        cover: succ[0].cover,
                        allClub: allclubs,
                    }
        
                    res.render('./layouts/main', {
                        edit: edit,
                        seasonInfo: season,
                        chuyenmuc: 'Hồ sơ mùa giải',
                        filename: '../season/info',
                        activeAdmin: true,
                        cssfiles: [
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                            '../../public/vendors/chosen/chosen.min.css',
                            
                        ],
                        jsfiles: [
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                            '../../public/assets/js/season/add.season.validation.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                            '../../public/assets/js/season/edit.season.js',
                            '../../public/vendors/chosen/chosen.jquery.min.js',
                            '../../public/assets/js/multiple.select.js',
                        ]
                    })
                }).catch(err =>{})
            }else{
            var season = {
                idMuaGiai: succ[0].idMuaGiai,
                tenMuaGiai: succ[0].tenMuaGiai,
                ngayBatDau: succ[0].ngayBatDau,
                ngayKetThuc: succ[0].ngayKetThuc,
                soDoiThamDu: succ[0].soDoiThamDu,
                viTriXuongHang: xuonghang,
                viTriDuC1: duC1,
                viTriDuC2: duC2,
                dsDoiBong: succ[0].dsDoiBong,
                dsVongDau: succ[0].dsVongDau,
                cover: succ[0].cover,
                allClub: allclubs,
            }
            console.log(season);
            res.render('./layouts/main', {
                edit: edit,
                seasonInfo: season,
                chuyenmuc: 'Hồ sơ mùa giải',
                filename: '../season/info',
                activeAdmin: true,
                cssfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                    '../../public/vendors/chosen/chosen.min.css',
                    
                ],
                jsfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                    '../../public/assets/js/season/add.season.validation.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                    '../../public/assets/js/season/edit.season.js',
                    '../../public/vendors/chosen/chosen.jquery.min.js',
                    '../../public/assets/js/multiple.select.js',
                ]
            })
        }
        })
})

router.post('/info/update/:id',(req,res,next) => {
    var xuonghang = [];
    req.body.xuongHang.split(",").forEach(element => {
        xuonghang.push(Number(element));
    });;
    var duC1 = [];
    req.body.duC1.split(",").forEach(element => {
        duC1.push(Number(element));
    });;
    var duC2 = [];
    req.body.duC2.split(",").forEach(element => {
        duC2.push(Number(element));
    });;

    var obj = {
        idMuaGiai: Number(req.params.id),
        tenMuaGiai: req.body.tenMuaGiai,
        ngayBatDau: req.body.dateStart,
        ngayKetThuc: req.body.dateEnd,
        soDoiThamDu: req.body.club.length,
        dsDoiBong: req.body.club,
        viTriXuongHang: xuonghang,
        viTriDuC1: duC1,
        viTriDuC2: duC2,
        cover: req.body.imgPath,
    }
    muagiai.update(obj).then( succ => {
        console.log(obj);

        res.redirect('/season/info/'+req.params.id + '&false');
    }).catch(err => {});
})

module.exports = router;