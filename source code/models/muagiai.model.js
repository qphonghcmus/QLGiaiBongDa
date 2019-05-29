var mongoose = require('mongoose');

// schema
var muagiaiSchema = new mongoose.Schema({
    id: Number,
    tenMuaGiai: String,
    ngayBatDau: String,
    ngayKetThuc: String,
    soDoiThamDu: Number,
    viTriXuongHang: [Number],
    viTriDuC1: [Number],
    viTriDuC2: [Number],
    dsDoiBong: [Number],
    dsVongDau: [Number]
})