var mongoose = require('mongoose');

// schema
var banthangSchema = new mongoose.Schema({
    id: Number,
    nguoiGhiBan: Number,
    nguoiKienTao: Number,
    loaiBanThang: {type: Number, min: 0, max: 1},
    phutGhiBan: Number
})