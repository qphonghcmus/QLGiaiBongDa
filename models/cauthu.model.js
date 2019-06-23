var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
// schema

var cauthuSchema = new mongoose.Schema({
    idCauThu: Number,
    tenCauThu: String,
    loaiCauThu: { type: Number, min: 0, max: 1 },
    quocTich: String,
    ngaySinh: String,
    tenDoiBong: { type: String, default: "Cầu thủ tự do" },
    doiBong: Schema.Types.ObjectId,
    // Thay đổi ds trận đấu chỉ ghi id trận đấu, và thêm trường số phút thi đấu
    dsTranDau: [Schema.Types.ObjectId],
    soPhutThiDau: { type: Number, default: 0 },
    soBanThang: { type: Number, default: 0 },
    soKienTao: { type: Number, default: 0 },
    soTheDo: { type: Number, default: 0 },
    soTheVang: { type: Number, default: 0 },
    viTriThiDau: { type: Number, min: 1, max: 4 },
    soTranGiuSachLuoi: { type: Number, default: 0 },
})


const cauthu = mongoose.model('cauthus', cauthuSchema);
const thongke = require('./thongkecauthu.model');

// auto increment _id
//cauthuSchema.plugin(autoIncrement, { inc_field: 'idCauThu' });

module.exports = {
    find: () => {
        return new Promise((resolve, reject) => {

            cauthu.find().exec((err, succ) => {
                if (err)
                    reject(err);
                else {
                    resolve(succ);
                }
            })
        });
    },

    findByClub: (clubID) => {
        return new Promise((resolve, reject) => {
            cauthu.find({ doiBong: clubID }).exec((err, succ) => {
                if (err)
                    reject(err);
                else {
                    console.log(succ);
                    resolve(succ);
                }
            })
        })
    },



    findById: (id) => {
        return new Promise((resolve, reject) => {

            cauthu.find({ _id: id }).exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {

            cauthu.countDocuments().exec((err, succ) => {
                if (err)
                    reject(err);
                else {
                    resolve(succ);
                }
            })
        });
    },

    add: (entity) => {
        return new Promise((resolve, reject) => {
            var club = require('./doibong.model');

            var obj = new cauthu({
                tenCauThu: entity.tenCauThu,
                loaiCauThu: entity.loaiCauThu,
                quocTich: entity.quocTich,
                ngaySinh: entity.dob,
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
            club.findById(obj.doiBong).then(succ => {
                thongke.add(cauthu).then(succ=>{

                })
                obj.tenDoiBong = succ.tenDoiBong;
                obj.save((err, succ) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(succ);
                    }
                })
            })
                .catch(err => {
                    reject(err)
                })
        });
    },

    update: (entity) => {
        return new Promise((resolve, reject) => {
            var club = require('./doibong.model');
            club.findById(entity.doiBong).then(succ => {
                cauthu.updateOne({ _id: entity.idCauThu }, {
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
                    doiBong: entity.doiBong,
                    tenDoiBong: succ.tenDoiBong
                }).exec((err, succ) => {
                    if (err)
                        reject(err);
                    else
                        resolve(succ.changedRows);
                })
            }).catch(err => {
                    reject(err)
                })

        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {

            cauthu.removeOne({ _id: id }).exec((err, succ) => {
                if (err)
                    reject(err);
                else {
                    resolve(succ.affectedRows);
                }
            })
        });
    },
}