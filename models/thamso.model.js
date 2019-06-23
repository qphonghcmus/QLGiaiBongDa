var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const thamsoSchema = new mongoose.Schema({
    idMuaGiai: Schema.Types.ObjectId,
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
    soDoiXuongHang: {type: Number, default: 2},
    soDoiDuC1: {type: Number, default: 1},
    soDoiDuC2: {type: Number, default: 2},
    soDoiThamDu: {type:Number, default:6}
})

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            thamso.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByIdMuaGiai: id => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            thamso.findOne({idMuaGiai: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    add: entity => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            var obj = new thamso({
                idMuaGiai: entity.idMuaGiai,
                tuoiMin: entity.tuoiMin,
                tuoiMax: entity.tuoiMax,
                soCauThuMin: entity.soCauThuMin,
                soCauThuMax: entity.soCauThuMax,
                soNgoaiBinhMax: entity.soNgoaiBinhMax,
                soPhutBuGioMax: entity.soPhutBuGioMax,
                diemSoThang: entity.diemSoThang,
                diemSoHoa: entity.diemSoHoa,
                diemSoThua: entity.diemSoThua,
                thuTuUuTien: entity.thuTuUuTien,
                soDoiXuongHang: entity.soDoiXuongHang,
                soDoiDuC1: entity.soDoiDuC1,
                soDoiDuC2: entity.soDoiDuC2,
                soDoiThamDu: entity.soDoiThamDu
            })
            obj.save((err,succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ);
                }
            })
        });
    },

    addNewSeasonID: entity => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            var obj = new thamso({
                idMuaGiai: entity._id,
                // tuoiMin: entity.tuoiMin,
                // tuoiMax: entity.tuoiMax,
                // soCauThuMin: entity.soCauThuMin,
                // soCauThuMax: entity.soCauThuMax,
                // soNgoaiBinhMax: entity.soNgoaiBinhMax,
                // soPhutBuGioMax: entity.soPhutBuGioMax,
                // diemSoThang: entity.diemSoThang,
                // diemSoHoa: entity.diemSoHoa,
                // diemSoThua: entity.diemSoThua,
                // thuTuUuTien: entity.thuTuUuTien,
                // soDoiXuongHang: entity.soDoiXuongHang,
                // soDoiDuC1: entity.soDoiDuC1,
                // soDoiDuC2: entity.soDoiDuC2,
                // soDoiThamDu: entity.soDoiThamDu
            })
            obj.save((err,succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ);
                }
            })
        });
    },

    updateAll: entity => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            thamso.update({idMuaGiai: entity.idMuaGiai},{
                idMuaGiai: entity.idMuaGiai,
                tuoiMin: entity.tuoiMin,
                tuoiMax: entity.tuoiMax,
                soCauThuMin: entity.soCauThuMin,
                soCauThuMax: entity.soCauThuMax,
                soNgoaiBinhMax: entity.soNgoaiBinhMax,
                soPhutBuGioMax: entity.soPhutBuGioMax,
                diemSoThang: entity.diemSoThang,
                diemSoHoa: entity.diemSoHoa,
                diemSoThua: entity.diemSoThua,
                thuTuUuTien: entity.thuTuUuTien,
                soDoiXuongHang: entity.soDoiXuongHang,
                soDoiDuC1: entity.soDoiDuC1,
                soDoiDuC2: entity.soDoiDuC2,
                soDoiThamDu: entity.soDoiThamDu
            }).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ.changedRows);
            })
        });
    },

    update1Property: (key,value) => {
        return new Promise((resolve, reject) =>{
            var thamso = mongoose.model('thamsos',thamsoSchema);
            thamso.updateOne({},{
                $set: {key:value}
            }).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ.changedRows);
            })
        });
    },
    
    
}