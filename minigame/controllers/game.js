var Hocvien = require('../models/Hocvien')

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('layout')
    })

    app.post('/dangky', function(req, res) {
        if (!req.body.Email || !req.body.HoTen || !req.body.SoDT) {
            res.json({ketqua: 0, maloi: 'Thieu tham so kia ban oi!'});
        } else {
            var hocvienMoi = new Hocvien({
                Email: req.body.Email,
                Hoten: req.body.HoTen,
                SoDT: req.body.SoDT,
                ThanhToan: false,
                Vi: '',
                Ngay: Date.now()
            });

            hocvienMoi.save(err => {
                if (err) {
                    res.json({ketqua: 0, maloi: 'MongoDB saved error: ' + err})
                } else {
                    res.json({ketqua: 1, maloi: hocvienMoi})
                }

            })
        }
    })
}