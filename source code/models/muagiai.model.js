var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

// schema
var muagiaiSchema = new mongoose.Schema({
    idMuaGiai: Number,
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
                dsVongDau: entity.dsVongDau
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
            
            muagiai.updateOne({idMuaGiai: entity.idMuaGiai},{
                tenMuaGiai: entity.tenMuaGiai,
                ngayBatDau: entity.ngayBatDau,
                ngayKetThuc: entity.ngayKetThuc,
                soDoiThamDu: entity.soDoiThamDu,
                viTriXuongHang: entity.viTriXuongHang,
                viTriDuC1: entity.viTriDuC1,
                viTriDuC2: entity.viTriDuC2,
                dsDoiBong: entity.dsDoiBong,
                dsVongDau: entity.dsVongDau
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