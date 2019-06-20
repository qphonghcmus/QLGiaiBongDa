var express = require('express');
var router = express.Router();
var muagiai = require('../../models/muagiai.model');
var doibong = require('../../models/doibong.model');
var vongdauModel = require('../../models/vongdau.model');
var trandauModel = require('../../models/trandau.model');

router.get('/add', (req, res, next) => {
    res.render('./home/home', {
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

    muagiai.findByIdWithDoiBong(idMuaGiai)
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
            
            doibong.find().then(values => {
                console.log(values);
                var season = {
                    idMuaGiai: succ[0]._id,
                    tenMuaGiai: succ[0].tenMuaGiai,
                    ngayBatDau: succ[0].ngayBatDau,
                    ngayKetThuc: succ[0].ngayKetThuc,
                    viTriXuongHang: xuonghang,
                    viTriDuC1: duC1,
                    viTriDuC2: duC2,
                    cover: succ[0].cover,
                    allClubs: values,
                }
                res.render('./layouts/main', {
                    edit: edit,
                    seasonInfo: season, dsDoiBong: succ[0].dsDoiBong,
                    chuyenmuc: 'Hồ sơ mùa giải',
                    filename: '../season/info',
                    activeAdmin: true,
                    idSeason: idMuaGiai,
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
            }).catch()
        }).catch()
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

    var obj_muagiai = {
        idMuaGiai: req.params.id,
        tenMuaGiai: req.body.tenMuaGiai,
        ngayBatDau: req.body.dateStart,
        ngayKetThuc: req.body.dateEnd,
        viTriXuongHang: xuonghang,
        viTriDuC1: duC1,
        viTriDuC2: duC2,
        cover: req.body.imgPath,
        dsDoiBong: req.body.club
    }

    muagiai.update(obj_muagiai).then(values => {
        res.redirect('/season/info/'+req.params.id + '&false');
    }).catch(err => {});
})

router.post('/info/updateCalendar/:id',(req,res,next)=>{

        

    let idSeason = req.params.id;

    // thamdu.findIDByMuaGiai(idSeason).then(succ=>{
        muagiai.getDSThamdu(idSeason).then(succ=>{


        let dsDoiBongThamDu = succ.dsDoiBong;

        let n =  dsDoiBongThamDu.length / 2;

    let home,away;

    for (let i = 1 ; i < 2*n ; i++){
        let sovong = i;
        let vongdau ={
            idMuaGiai : idSeason,
            thuTu: sovong,
        }
        vongdauModel.add(vongdau).then(succ=>{
        for ( let j = 0; j < n ; j++){

                if ( j==0 ){
                    home = i;   away = 2*n;
                    let trandau = {
                        // idMuaGiai: idSeason,
                        // vongDau: sovong,
                        doiNha:  dsDoiBongThamDu[home-1],
                        doiKhach: dsDoiBongThamDu[away-1], 
                    }
                    trandauModel.add(trandau,idSeason,sovong).then(succ=>{
                        console.log("Thêm 1 trận đấu");
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                    console.log(trandau);
                }
                else {
                    home = i - j; away = i + j;
                    if(home < 0)	home = home + ( 2*n - 1)
                    if(home ===0)	home = 2*n - 1
                    if(away >= 2*n)	away = away % (2*n - 1)
                    let trandau = {
                        // idMuaGiai: idSeason,
                        // vongDau: sovong,
                        doiNha:  dsDoiBongThamDu[home-1],
                        doiKhach: dsDoiBongThamDu[away-1], 
                    }
                    trandauModel.add(trandau,idSeason,sovong).then(succ=>{
                        console.log(succ);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                    console.log(trandau);
                }
                


        }
    })

            .catch(err=>{
                console.log(err);
            })

    }
    
    for (var i = 1; i < 2*n; i++){
        var f = i + 2*n - 1
        let sovong = f;
        let vongdau ={
            idMuaGiai : idSeason,
            thuTu: sovong,
        }
        vongdauModel.add(vongdau).then(succ=>{

        for( var j = 0; j < n; j++) {

                if(j == 0){
                    home = i;	away = 2*n;
                    let trandau = {
                        // idMuaGiai: idSeason,
                        // vongDau: sovong,
                        doiNha:  dsDoiBongThamDu[home-1],
                        doiKhach: dsDoiBongThamDu[away-1], 
                    }
                    trandauModel.add(trandau,idSeason,sovong).then(succ=>{
                        console.log(succ);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                    console.log(trandau);
                }else{
                    home = i - j;	away = i+j;
                    if(home < 0)	home = home + ( 2*n - 1)
                    if(home ===0)	home = 2*n - 1
                    if(away >= 2*n)	away = away % (2*n - 1)
                    let trandau = {
                        // idMuaGiai: idSeason,
                        // vongDau: sovong,
                        doiNha:  dsDoiBongThamDu[home-1],
                        doiKhach: dsDoiBongThamDu[away-1], 
                    }
                    trandauModel.add(trandau,idSeason,sovong).then(succ=>{
                        console.log(succ);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                    console.log(trandau);
                }
            // })
            // .catch(err=>{
            //     console.log(err);
            // })

        }

    })            .catch(err=>{
        console.log(err);
    })

    }
            

    res.redirect('/season/info/'+req.params.id + '&false');
    })
    .catch(err=>{
        console.log(err);
    })


})

module.exports = router;
