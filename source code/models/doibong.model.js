var mongoose = require('mongoose');

// schema
var doibongSchema = new mongoose.Schema({
    idDoiBong: Number,
    tenDoiBong: String,
    svd: String,
    hlv: String,
    dsCauThu: [Number],
    dsTranDau: [Number],
    soCauThuNuocNgoai: Number
})

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var doibong = mongoose.model('doibongs',doibongSchema);
            doibong.find().exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) =>{
            var doibong = mongoose.model('doibongs',doibongSchema);
            doibong.find({idDoiBong: id}).exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var doibong = mongoose.model('doibongs',doibongSchema);
            doibong.countDocuments().exec((err,dbs) => {
                if(err)
                    reject(err);
                else{
                    resolve(dbs);
                }
            })
        });
    },

    add: (entity) => {
        return new Promise((resolve, reject) =>{
            var doibong = mongoose.model('doibongs',doibongSchema);
            var obj = new doibong({
                idDoiBong: entity.idDoiBong,
                tenDoiBong: entity.tenDoiBong,
                svd: entity.svd,
                hlv: entity.hlv,
                dsCauThu: entity.dsCauThu,
                dsTranDau: entity.dsTranDau,
                soCauThuNuocNgoai: entity.soCauThuNuocNgoai
            })
            obj.save((err,dbs) => {
                if(err)
                    reject(err);
                else{
                    resolve(dbs);
                }
            })
        });
    },

    update: (entity) => {
        return new Promise((resolve, reject) => {
            var doibong = mongoose.model('doibongs',doibongSchema);
            doibong.update({idDoiBong:entity.idDoiBong},{
                tenDoiBong: entity.tenDoiBong,
                svd: entity.svd,
                hlv: entity.hlv,
                dsCauThu: entity.dsCauThu,
                dsTranDau: entity.dsTranDau,
                soCauThuNuocNgoai: entity.soCauThuNuocNgoai
            }).exec((err, dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs.changedRows);
            })
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            var doibong = mongoose.model('doibongs',doibongSchema);
            doibong.remove({idDoiBong:id}).exec((err, dbs) => {
                if(err)
                    reject(err);
                else{
                    resolve(dbs.affectedRows);
                }
            })
        });
    },      
}