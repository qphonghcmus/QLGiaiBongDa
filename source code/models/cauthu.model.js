var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
// schema

var cauthuSchema = new mongoose.Schema({
    idCauThu: Number,
    tenCauThu: String,
    loaiCauThu: {type: Number, min: 0, max: 1},
    quocTich: String,
    ngaySinh: String,
    tenDoiBong: {type: String, default: "Cầu thủ tự do"},
    doiBong: [Schema.Types.ObjectId],
    // Thay đổi ds trận đấu chỉ ghi id trận đấu, và thêm trường số phút thi đấu
    dsTranDau: [Schema.Types.ObjectId],
    soPhutThiDau: { Type : Number, default : 0},
    soBanThang: {type: Number, default: 0},
    soKienTao: {type: Number, default: 0},
    soTheDo: {type: Number, default: 0},
    soTheVang: {type: Number, default: 0},
    viTriThiDau: {type: Number, min:1,max:4},
    soTranGiuSachLuoi:{type: Number, default: 0},
})

// auto increment _id
cauthuSchema.plugin(autoIncrement,{inc_field: 'idCauThu'});

module.exports = {
    find: () => {
        return new Promise((resolve, reject) =>{
            var cauthu = mongoose.model('cauthus',cauthuSchema);
            cauthu.find().exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) =>{
            var cauthu = mongoose.model('cauthus',cauthuSchema);
            cauthu.find({idCauThu: id}).exec((err,succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) =>{
            var cauthu = mongoose.model('cauthus',cauthuSchema);
            cauthu.countDocuments().exec((err,succ) => {
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
            var cauthu = mongoose.model('cauthus',cauthuSchema);

            var obj = new cauthu({
                tenCauThu: entity.tenCauThu,
                loaiCauThu: entity.loaiCauThu,
                quocTich: entity.quocTich,
                ngaySinh: entity.ngaySinh,
                dsTranDau: entity.dsTranDau,
                tenDoiBong: entity.tenDoiBong,
                soPhutThiDau: entity.soPhutThiDau,
                doiBong: entity.doiBong,
                soBanThang: entity.soBanThang,
                soKienTao: entity.soKienTao,
                soTheDo: entity.soTheDo,
                soTheVang: entity.soTheVang,
                viTriThiDau: entity.viTriThiDau,
                soTranGiuSachLuoi: entity.soTranGiuSachLuoi,
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
            var cauthu = mongoose.model('cauthus',cauthuSchema);
            
            cauthu.updateOne({idCauThu: entity.idCauThu},{
                tenCauThu: entity.tenCauThu,
                loaiCauThu: entity.loaiCauThu,
                quocTich: entity.quocTich,
                ngaySinh: entity.ngaySinh,
                dsTranDau: entity.dsTranDau,
                soBanThang: entity.soBanThang,
                soKienTao: entity.soKienTao,
                soTheDo: entity.soTheDo,
                soTheVang: entity.soTheVang,
                viTriThiDau: entity.viTriThiDau,
                soTranGiuSachLuoi: entity.soTranGiuSachLuoi,
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
            var cauthu = mongoose.model('cauthus',cauthuSchema);
            cauthu.removeOne({idCauThu:id}).exec((err, succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ.affectedRows);
                }
            })
        });
    },      
}