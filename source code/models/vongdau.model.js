var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

// schema
var vongdauSchema = new mongoose.Schema({
    idVongDau: Number,
    tenVongDau: String
})

vongdauSchema.plugin(autoIncrement,{inc_field: 'idVongDau'});

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var vongdau = mongoose.model('vongdaus',vongdauSchema);
            vongdau.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) =>{
            var vongdau = mongoose.model('vongdaus',vongdauSchema);
            vongdau.find({idVongDau: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var vongdau = mongoose.model('vongdaus',vongdauSchema);
            vongdau.countDocuments().exec((err,succ) => {
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
            var vongdau = mongoose.model('vongdaus',vongdauSchema);

            var obj = new vongdau({
                tenVongDau: entity.tenVongDau
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
            
            vongdau.updateOne({idVongDau: entity.idVongDau},{
                tenVongDau: entity.tenVongDau
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
            vongdau.removeOne({idVongDau:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}