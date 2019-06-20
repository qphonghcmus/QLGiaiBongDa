var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
var thamduSchema = new mongoose.Schema({
    DsDoiBong: [{type:Schema.Types.ObjectId,ref:'doibongs',require:true}],
    idMuaGiai: {type:Schema.Types.ObjectId,ref:'muagiais',require:true},
});

const thamdu = mongoose.model('thamdus',thamduSchema);  

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {
            thamdu.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        })
    },

    findById: id => {
        return new Promise((resolve, reject) =>{
                      
            thamdu.find({_id: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByMuagiai: id => {
        return new Promise((resolve, reject) =>{
                      
            thamdu.find({idMuaGiai: id}).populate('DsDoiBong', 'tenDoiBong').exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{             
            thamdu.countDocuments().exec((err,succ) => {
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

            var obj = new thamdu({
                DsDoiBong: entity.idDoiBong,
                idMuaGiai: entity.idMuaGiai,
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
            console.log('updating');
            thamdu.updateOne({idMuaGiai: entity.idMuaGiai},{
                DsDoiBong: entity.DsDoiBong,
            },{upsert:true}).exec((err, succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ.changedRows);
            })
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            thamdu.removeOne({idMuaGiai:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },   
}