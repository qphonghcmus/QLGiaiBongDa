var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
// schema
var trandauSchema = new mongoose.Schema({
    // idTranDau: Number,
    vongDau: Number,
    doiNha: {type:Schema.Types.ObjectId,ref:'doibongs',require:true},
    doiKhach: {type:Schema.Types.ObjectId,ref:'doibongs',require:true},
    diemDoiNha: Number,
    diemDoiKhach: Number,
    theVangDoiNha: Number,
    theDoDoiKhach: Number,
    theVangDoiNha: Number,
    theDoDoiNha: Number,
    // dsBanThang: [Number],
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

    findByRound: (round) => {
        return new Promise((resolve, reject) =>{
            var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find({vongDau:round})
            .populate('doiNha','tenDoiBong svd')
            .populate('doiKhach','tenDoiBong')
            .exec((err,succ) => {
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
            let trandau = mongoose.model('trandaus',trandauSchema);

            let obj = new trandau({
                vongDau: entity.vongDau,
                doiNha: entity.doiNha,
                doiKhach: entity.doiKhach,
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