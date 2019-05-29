var mongoose = require('mongoose');

// schema
const thamsoSchema = new mongoose.Schema({
    tuoiMin: {type: Number, default: 16},
    tuoiMax: {type: Number, default: 40},
    soCauThuMin: {type: Number, default: 14},
    soCauThuMax: {type: Number, default: 24},
    soNgoaiBinhMax: {type: Number, default: 3},
    soPhutBuGioMax: {type: Number, default: 10},
    diemSoThang: {type: Number, default: 3},
    diemSoHoa: {type: Number, default: 1},
    diemSoThua: {type: Number, default: 0},
    thuTuUuTien: {type: Number, default: 1},
    soDoiXuongHang: {type: Number, default: 3},
    soDoiDuC1: {type: Number, default: 4},
    soDoiDuC2: {type: Number, default: 3}
})