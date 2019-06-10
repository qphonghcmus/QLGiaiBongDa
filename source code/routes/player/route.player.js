var express = require('express');
var router = express.Router();

const player = require('../../models/cauthu.model');

router.get('/lookup', (req, res) => {
    console.log('xxxxxxxxxx');
    player.find().then(succ =>{
    console.log('yyyyyyyyyy');

        res.render('./layouts/main', {
        danhsachcauthu : succ,
        chuyenmuc: 'Tra cứu cầu thủ',
        filename: '../player/players-detail',
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
    

    // res.render('./layouts/main', {
    //     chuyenmuc: 'Tra cứu cầu thủ',
    //     filename: '../player/players-detail',
    //     activeCauthu: true,
    //     cssfiles: [
    //         '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
    //     ],
    //     jsfiles: [
    //         '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
    //         '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
    //         '../../public/assets/js/datatable.js'
    //     ]
    // })
})

router.get('/add', (req, res) => {
    res.render('./layouts/main', {
        chuyenmuc: 'Đăng ký cầu thủ',
        filename: '../player/add-player',
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

router.post('/add', (req, res) => {

    let entity = req.body;

    player.add(entity)
        .then(succ => {
            console.log(req.body);
            const messagesSuccess = "Đã thêm cầu thủ  \" " + succ.tenCauThu + " \" thành công";
            res.render('./layouts/main', {
                chuyenmuc: 'Đăng ký cầu thủ',
                filename: '../player/add-player',
                activeCauthu: true,
                cssfiles: [
                ],
                jsfiles: [
                ],
                messagesSuccess : messagesSuccess,
                success : true,
            })
        })
        .catch(err => {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"+err);
        });


})
module.exports = router;