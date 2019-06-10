var multer = require('multer');

var storageAvatar = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/assets/img/avatar/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

var storageLogo= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/assets/img/logo/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

var uploadAvatar = multer({storage: storageAvatar})
var uploadLogo = multer({storage: storageLogo})

module.exports = function(app){
    app.post('/upload/avatar',(req,res,next)=>{
        uploadAvatar.array('avatar')(req,res,err => {
            if(err){
                return res.json({
                    error: err.message
                })
            }
            res.json({})
            
        })
    })
    app.post('/upload/logo',(req,res,next) => {
        uploadLogo.array('logo')(req,res,err => {
            if(err){
                return res.json({
                    error: err.message
                })
            }
            res.json({})
        })
    })
}