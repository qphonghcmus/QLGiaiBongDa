
var express = require('express');
var router = express.Router();
var muagiai = require('../../models/muagiai.model')
var trandau = require('../../models/trandau.model')
var thamso = require('../../models/thamso.model')
var thongke = require('../../models/thongkecauthu.model')

router.get('/bxh/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    var allClubs = []

    muagiai.findByIdWithDoiBong(idMuaGiai).then(list => {
        var listClub = list[0].dsDoiBong;
        var count = 0;
        listClub.forEach(e => {
            var wins = 0
            var losts = 0
            var draws = 0
            var goalsFor = 0
            var goalsAgainst = 0
            Promise.all([
                trandau.findHome(e._id),
                trandau.findAway(e._id),
                thamso.findByIdMuaGiai(idMuaGiai)
            ]).then(values => {

                count++
                values[0].forEach(eHome => {
                    if (typeof (eHome.banThangDoiNha) === 'undefined') return;

                    goalsFor = goalsFor + eHome.banThangDoiNha
                    goalsAgainst = goalsAgainst + eHome.banThangDoiKhach
                    if (eHome.banThangDoiNha > eHome.banThangDoiKhach) wins = wins + 1;
                    else if (eHome.banThangDoiNha < eHome.banThangDoiKhach) losts = losts + 1;
                    else draws = draws + 1;
                })
                values[1].forEach(eAway => {
                    if (typeof (eAway.banThangDoiNha) === 'undefined') return;

                    goalsFor = goalsFor + eAway.banThangDoiKhach
                    goalsAgainst = goalsAgainst + eAway.banThangDoiNha
                    if (eAway.banThangDoiKhach > eAway.banThangDoiNha) wins = wins + 1;
                    else if (eAway.banThangDoiKhach < eAway.banThangDoiNha) losts = losts + 1;
                    else draws = draws + 1;
                })
                var club = {
                    id: e._id, name: e.tenDoiBong,
                    wins: wins, draws: draws, losts: losts,
                    goalsFor: goalsFor, goalsAgainst: goalsAgainst,
                    goalsDiff: goalsFor - goalsAgainst,
                    point: wins * values[2].diemSoThang + losts * values[2].diemSoThua + draws * values[2].diemSoHoa,
                }

                allClubs.push(club);
                if (count === listClub.length) {
                    sortClubs(allClubs, values[2].thuTuUuTien);

                    res.render('./layouts/main', {
                        chuyenmuc: 'Bảng xếp hạng',
                        filename: '../baocao/bxh',
                        idSeason: idMuaGiai,
                        activeBaocao: true,
                        clubs: allClubs,
                        cssfiles: [
                            '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
                        ],
                        jsfiles: [
                            '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                            '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                            '../../public/assets/js/datatable.js'
                        ]
                    })
                }
            }).catch()
        });
    }).catch()
})

function sortGoals(list) {
    list.sort((a, b) => {
        if (a.soBanThang > b.soBanThang) return -1
        if (a.soBanThang === b.soBanThang) {
            if (a.soKienTao > b.soKienTao) return -1;
            if (a.soKienTao === b.soKienTao) {
                if (a.soTheVang < b.soTheVang) return -1;
                if (a.soTheVang === b.soTheVang) {
                    if (a.soTheDo < b.soTheDo) return -1;
                    return 0;
                }
            }
        }
    })
}

function sortAssits(list) {
    list.sort((a, b) => {
        if (a.soKienTao > b.soKienTao) return -1
        if (a.soKienTao === b.soKienTao) {
            if (a.soBanThang > b.soBanThang) return -1;
            if (a.soBanThang === b.soBanThang) {
                if (a.soTheVang < b.soTheVang) return -1;
                if (a.soTheVang === b.soTheVang) {
                    if (a.soTheDo < b.soTheDo) return -1;
                    return 0;
                }
            }
        }
    })
}

function sortClubs(allClubs, priority) {
    if (priority === 1) {
        allClubs.sort((a, b) => {
            if (a.point > b.point) return -1
            if (a.point === b.point) {
                if (a.goalsDiff > b.goalsDiff) return -1;
                if (a.goalsDiff === b.goalsDiff) {
                    if (a.goalsFor > b.goalsFor) return -1;
                    if (a.goalsFor === b.goalsFor) return 0;
                }
            }
        })
    } else if (priority === 2) {
        allClubs.sort((a, b) => {
            if (a.point > b.point) return -1
            if (a.point === b.point) {
                if (a.goalsFor > b.goalsFor) return -1;
                if (a.goalsFor === b.goalsFor) {
                    if (a.goalsDiff > b.goalsDiff) return -1;
                    if (a.goalsDiff === b.goalsDiff) return 0;
                }
            }
        })
    } else if (priority === 3) {
        allClubs.sort((a, b) => {
            if (a.goalsDiff > b.goalsDiff) return -1
            if (a.goalsDiff === b.goalsDiff) {
                if (a.point > b.point) return -1;
                if (a.point === b.point) {
                    if (a.goalsFor > b.goalsFor) return -1;
                    if (a.goalsFor === b.goalsFor) return 0;
                }
            }
        })
    } else if (priority === 4) {
        allClubs.sort((a, b) => {
            if (a.goalsDiff > b.goalsDiff) return -1
            if (a.goalsDiff === b.goalsDiff) {
                if (a.goalsFor > b.goalsFor) return -1;
                if (a.goalsFor === b.goalsFor) {
                    if (a.point > b.point) return -1;
                    if (a.point === b.point) return 0;
                }
            }
        })
    } else if (priority === 5) {
        allClubs.sort((a, b) => {
            if (a.goalsFor > b.goalsFor) return -1
            if (a.goalsFor === b.goalsFor) {
                if (a.point > b.point) return -1;
                if (a.point === b.point) {
                    if (a.goalsDiff > b.goalsDiff) return -1;
                    if (a.goalsDiff === b.goalsDiff) return 0;
                }
            }
        })
    } else {
        allClubs.sort((a, b) => {
            if (a.goalsFor > b.goalsFor) return -1
            if (a.goalsFor === b.goalsFor) {
                if (a.goalsDiff > b.goalsDiff) return -1;
                if (a.goalsDiff === b.goalsDiff) {
                    if (a.point > b.point) return -1;
                    if (a.point === b.point) return 0;
                }
            }
        })
    }
}

router.get('/ghiban/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;

    thongke.thongkeCauthu(idMuaGiai).then(list => {
        sortGoals(list);
        res.render('./layouts/main', {
            chuyenmuc: 'Top ghi bàn',
            filename: '../baocao/ghiban',
            idSeason: idMuaGiai,
            listPlayer: list,
            activeBaocao: true,
            cssfiles: [
                '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            ],
            jsfiles: [
                '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                '../../public/assets/js/datatable.js'
            ]
        })
    }).catch()

})

router.get('/kientao/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    thongke.thongkeCauthu(idMuaGiai).then(list => {
        sortAssits(list);
        res.render('./layouts/main', {
            chuyenmuc: 'Top kiến tạo',
            filename: '../baocao/kientao',
            idSeason: idMuaGiai,
            listPlayer: list,
            activeBaocao: true,
            cssfiles: [
                '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            ],
            jsfiles: [
                '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                '../../public/assets/js/datatable.js'
            ]
        })
    }).catch()
})

module.exports = router;