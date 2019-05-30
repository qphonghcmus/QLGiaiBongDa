var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

// schema
var trandauSchema = new mongoose.Schema({
    idTranDau: Number,
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

trandauSchema.plugin(autoIncrement,{inc_field: 'idTranDau'});

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) =>{
            var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find({idTranDau: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.countDocuments().exec((err,succ) => {
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
            var trandau = mongoose.model('trandaus',trandauSchema);

            var obj = new trandau({
                doiNha: entity.doiNha,
                doiKhach: entity.doiKhach,
                svd: entity.svd,
                tiSo: entity.tiSo,
                dsBanThang: entity.dsBanThang,
                idVongDau: entity.idVongDau,
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
            var trandau = mongoose.model('trandaus',trandauSchema);
            
            trandau.updateOne({idTranDau: entity.idTranDau},{
                doiNha: entity.doiNha,
                doiKhach: entity.doiKhach,
                svd: entity.svd,
                tiSo: entity.tiSo,
                dsBanThang: entity.dsBanThang,
                idVongDau: entity.idVongDau,
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
            var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.removeOne({idTranDau:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}