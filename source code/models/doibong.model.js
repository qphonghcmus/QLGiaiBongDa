var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema
var doibongSchema = new mongoose.Schema({
    tenDoiBong: String,
    svd: String,
    hlv: String,
    dsCauThu: [Schema.Types.ObjectId],
    soCauThuNuocNgoai: Number,
    logo: {type:String, default:'../public/assets/img/logo/HAGL.png'}
})
const doibong = mongoose.model('doibongs',doibongSchema);

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            doibong.find().exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            doibong.findById(id).exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
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
            var obj = new doibong({
                tenDoiBong: entity.tendoibong,
                svd: entity.svd,
                hlv: entity.hlv,
                dsCauThu: entity.dsCauThu,
                soCauThuNuocNgoai: entity.soCauThuNuocNgoai,
                logo: entity.imgPath
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
            doibong.updateOne({_id:entity.idDoiBong},{
                tenDoiBong: entity.tendoibong,
                svd: entity.svd,
                hlv: entity.hlv,
                dsCauThu: entity.dsCauThu,
                soCauThuNuocNgoai: entity.soCauThuNuocNgoai,
                logo: entity.imgPath
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
            doibong.removeOne({_id:id}).exec((err, dbs) => {
                if(err)
                    reject(err);
                else{
                    resolve(dbs.affectedRows);
                }
            })
        });
    },   
    
    findByIdAndUpdate: (entity, id)  => {
        return new Promise((resolve, reject) => {
            var obj = {
                tenDoiBong: entity.tendoibong,
                svd: entity.svd,
                hlv: entity.hlv,
                logo: entity.imgPath,
                dsCauThu: entity.dsCauThu,
                soCauThuNuocNgoai: entity.soCauThuNuocNgoai
            };
            doibong.findByIdAndUpdate(id, obj).exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        })
    }
    
}