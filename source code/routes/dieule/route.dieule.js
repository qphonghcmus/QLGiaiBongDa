var express = require('express');
var router = express.Router();

router.get('/edit', (req,res) => {
    res.render('./layouts/main',{
        chuyenmuc: 'Thay đổi quy định',
        filename: '../dieule/edit',
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

module.exports = router;