var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

// schema
var banthangSchema = new mongoose.Schema({
    idBanThang: Number,
    nguoiGhiBan: Number,
    nguoiKienTao: Number,
    loaiBanThang: {type: Number, min: 0, max: 1},
    phutGhiBan: Number
})

banthangSchema.plugin(autoIncrement,{inc_field: 'idBanThang'});

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            var banthang = mongoose.model('banthangs',banthangSchema);
            banthang.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        })
    },

    findById: id => {
        return new Promise((resolve, reject) =>{
            var banthang = mongoose.model('banthangs',banthangSchema);            
            banthang.find({idBanThang: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var banthang = mongoose.model('banthangs',banthangSchema);                        
            banthang.countDocuments().exec((err,succ) => {
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
            var banthang = mongoose.model('banthangs',banthangSchema);  

            var obj = new banthang({
                nguoiGhiBan: entity.nguoiGhiBan,
                nguoiKienTao: entity.nguoiKienTao,
                loaiBanThang: entity.loaiBanThang,
                phutGhiBan: entity.phutGhiBan
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
            var banthang = mongoose.model('banthangs',banthangSchema);  
            
            banthang.updateOne({idBanThang: entity.idBanThang},{
                nguoiGhiBan: entity.nguoiGhiBan,
                nguoiKienTao: entity.nguoiKienTao,
                loaiBanThang: entity.loaiBanThang,
                phutGhiBan: entity.phutGhiBan
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
            var banthang = mongoose.model('banthangs',banthangSchema);  
            banthang.removeOne({idBanThang:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}