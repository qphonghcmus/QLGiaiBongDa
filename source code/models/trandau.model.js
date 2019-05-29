var mongoose = require('mongoose');

// schema
var trandauSchema = new mongoose.Schema({
    id: Number,
    doiNha: Number,
    doiKhach: Number,
    svd: String,
    tiSo: {
        thang: Number,
        thua: Number
    },
    dsBanThang: [Number],
    idVongDau: Number,
})