var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// schema
var muagiaiSchema = new mongoose.Schema({
    idMuaGiai: Number,
    tenMuaGiai: String,
    ngayBatDau: String,
    ngayKetThuc: String,
    soDoiThamDu: {type: Number, default: 0},
    viTriXuongHang: [Number],
    viTriDuC1: [Number],
    viTriDuC2: [Number],
    // moi object gom 2 truong: ma doi (idDoiBong) va ten doi (tenDoiBong)
    // dsDoiBong: [Schema.Types.ObjectId],
    // dsDoiBong: {type:[Schema.Types.ObjectId], default:[]},
    dsDoiBong: [String],

    dsVongDau: [Number],
    cover: String
})

// auto increment id
muagiaiSchema.plugin(autoIncrement,{inc_field: 'idMuaGiai'});

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findById: id => {
        return new Promise((resolve, reject) =>{
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.find({idMuaGiai: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.countDocuments().exec((err,succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ);
                }
            })
        });
    },

    add: (entity) => {
        return new Promise((resolve, reject) =>{
            var muagiai = mongoose.model('muagiais',muagiaiSchema);

            var obj = new muagiai({
                tenMuaGiai: entity.tenMuaGiai,
                ngayBatDau: entity.ngayBatDau,
                ngayKetThuc: entity.ngayKetThuc,
                soDoiThamDu: entity.soDoiThamDu,
                viTriXuongHang: entity.viTriXuongHang,
                viTriDuC1: entity.viTriDuC1,
                viTriDuC2: entity.viTriDuC2,
                dsDoiBong: entity.dsDoiBong,
                dsVongDau: entity.dsVongDau,
                cover: entity.cover,
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

    update: (entity) => {
        return new Promise((resolve, reject) => {
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            console.log('updating');
            muagiai.updateOne({idMuaGiai: entity.idMuaGiai},{
                tenMuaGiai: entity.tenMuaGiai,
                ngayBatDau: entity.ngayBatDau,
                ngayKetThuc: entity.ngayKetThuc,
                soDoiThamDu: entity.soDoiThamDu,
                viTriXuongHang: entity.viTriXuongHang,
                viTriDuC1: entity.viTriDuC1,
                viTriDuC2: entity.viTriDuC2,
                dsDoiBong: entity.dsDoiBong,
                dsVongDau: entity.dsVongDau,
                cover:entity.cover
            }).exec((err, succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ.changedRows);
            })
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.removeOne({idMuaGiai:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}