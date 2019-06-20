var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// schema
var vongdauSchema = new mongoose.Schema({
    idMuaGiai: {type:Schema.Types.ObjectId,ref:'muagiais',require:true},
    thuTu: Number,
    DsTranDau: [{type:Schema.Types.ObjectId,ref:'trandaus',require:true}],
})

// vongdauSchema.plugin(autoIncrement,{inc_field: 'idVongDau'});
const vongdau = mongoose.model('vongdaunews',vongdauSchema);

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            vongdau.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByIdMuaGiai: (id) => {
        return new Promise((resolve, reject) =>{
            vongdau.find({idMuaGiai: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: (id) => {
        return new Promise((resolve, reject) =>{
            vongdau.countDocuments({idMuaGiai: id}).exec((err,succ) => {
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
            var obj = new vongdau({
                idMuaGiai: entity.idMuaGiai,
                thuTu: entity.thuTu,
                DsTranDau: entity.DsTranDau,
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
            var vongdau = mongoose.model('vongdaus',vongdauSchema);
            
            vongdau.updateOne({idMuaGiai: entity.idMuaGiai},{
                thuTu: entity.thuTu,
                DsTranDau: entity.DsTranDau,
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
            var vongdau = mongoose.model('vongdaus',vongdauSchema);
            vongdau.removeOne({idMuaGiai:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}