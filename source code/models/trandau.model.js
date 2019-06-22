var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
// schema
var trandauSchema = new mongoose.Schema({
    // idTranDau: Number,
    // idMuaGiai: {type: Schema.Types.ObjectId, ref:'muagiais', require:true},
    // vongDau: Number,
    doiNha: {type:Schema.Types.ObjectId,ref:'doibongs',require:true},
    doiKhach: {type:Schema.Types.ObjectId,ref:'doibongs',require:true},
    svd: String,
    banThangDoiNha: Number,
    banThangDoiKhach: Number,
    theVangDoiNha: Number,
    theDoDoiNha: Number,
    theVangDoiKhach: Number,
    theDoDoiKhach: Number,
    // dsBanThang: [Number],
})

const trandau = mongoose.model('trandaus',trandauSchema);

// trandauSchema.plugin(autoIncrement,{inc_field: 'idTranDau'});
const vongdau = require('./vongdau.model');
const doibong = require('./doibong.model');

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByRound: (round, idMuaGiai) => {
        return new Promise((resolve, reject) =>{
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find(
                {
                    vongDau:round,
                    idMuaGiai: idMuaGiai,
                }
                )
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
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find({idTranDau: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findHome: id => {
        return new Promise((resolve, reject) =>{
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find({doiNha: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findAway: id => {
        return new Promise((resolve, reject) =>{
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.find({doiKhach: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            // var trandau = mongoose.model('trandaus',trandauSchema);
            trandau.countDocuments().exec((err,succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ);
                }
            })
        });
    },

    add: (entity,idMuaGiai,vongDau) => {
        return new Promise((resolve, reject) =>{
            let trandau = mongoose.model('trandaus',trandauSchema);

            doibong.findById({
                _id : entity.doiNha,
            })
            .then(succ=>{
                let svd = succ.svd;

                let obj = new trandau({
                    // idMuaGiai: entity.idMuaGiai,
                    // vongDau: entity.vongDau,
                    doiNha: entity.doiNha,
                    doiKhach: entity.doiKhach,
                    svd: svd,
                })
                
                obj.save((err,succ) => {
                    if(err)
                        reject(err);
                    else{
                        // vongdau.addTranDauVaoVongDau(succ._id,entity.idMuaGiai,entity.vongDau)
                        vongdau.addTranDauVaoVongDau(succ._id,idMuaGiai,vongDau)
                            .then(succ=>{
                                resolve(succ);
                            })
                            .catch(err=>{
                                reject(err);
                            })
                        // resolve(succ);
                    }
                })

            })
            .catch(err=>{
                console.log(err)
            })


        });
    },

    update: (entity) => {
        return new Promise((resolve, reject) => {
            // var trandau = mongoose.model('trandaus',trandauSchema);
            
            trandau.updateOne({_id: entity.idTranDau},{
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

    updateStat: (entity) => {
        return new Promise((resolve, reject) => {
            // var trandau = mongoose.model('trandaus',trandauSchema);
            
            trandau.updateOne({_id: entity.idTranDau},{
                $set:{
                    banThangDoiNha: entity.banthangDoiNha, banThangDoiKhach: entity.banthangDoiKhach,
                    theVangDoiNha: entity.theVangDoiNha, theDoDoiNha: entity.theDoDoiNha,
                    theDoDoiKhach: entity.theDoDoiKhach, theVangDoiKhach: entity.theVangDoiKhach
                }
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
            // var trandau = mongoose.model('trandaus',trandauSchema);
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