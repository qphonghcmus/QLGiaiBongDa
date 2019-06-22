var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// schema
var muagiaiSchema = new mongoose.Schema({
    tenMuaGiai: String,
    ngayBatDau: String,
    ngayKetThuc: String,
    viTriXuongHang: [Number],
    viTriDuC1: [Number],
    viTriDuC2: [Number],
    dsDoiBong: [{type:Schema.Types.ObjectId,ref:'doibongs',require:true}],
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
            muagiai.find({_id: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    getDSThamdu: (id) => {
        return new Promise((resolve, reject) =>{
            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.findById(id)
            .select('dsDoiBong')
            .exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByIdWithDoiBong: id => {
        return new Promise((resolve, reject) =>{

            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.find({_id: id}).populate('dsDoiBong','_id tenDoiBong').exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByIdWithDoiBongAndCauThu: id => {
        return new Promise((resolve, reject) =>{

            var muagiai = mongoose.model('muagiais',muagiaiSchema);
            muagiai.find({_id: id})
            .populate('dsDoiBong','_id tenDoiBong dsCauThu')
            // .populate({
            //     path: 'dsDoiBong',
            //     // Get friends of friends - populate the 'friends' array for every friend
            //     populate: { path: 'dsCauThu' },
            // })
            .exec((err,succ) => {
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
                viTriXuongHang: entity.viTriXuongHang,
                viTriDuC1: entity.viTriDuC1,
                viTriDuC2: entity.viTriDuC2,
                dsDoiBong: entity.dsDoiBong,
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
            muagiai.updateOne({_id: entity.idMuaGiai},{
                tenMuaGiai: entity.tenMuaGiai,
                ngayBatDau: entity.ngayBatDau,
                ngayKetThuc: entity.ngayKetThuc,
                viTriXuongHang: entity.viTriXuongHang,
                viTriDuC1: entity.viTriDuC1,
                viTriDuC2: entity.viTriDuC2,
                dsDoiBong: entity.dsDoiBong,
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
            muagiai.removeOne({_id:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}