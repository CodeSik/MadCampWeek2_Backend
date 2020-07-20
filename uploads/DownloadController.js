var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');

    var storage = multer.diskStorage({
        destination: (req, file, callback)=>{
            callback(null,"uploads/");
        },
        filename: (req,file,callback)=>{
            callback(null,file.originalname);
        }
    });
    //var upload = multer({dest: 'uploads/'})
var upload = multer({storage: storage});
var fs = require('fs');

router.use(bodyParser.urlencoded({ extended:true }));
//router.get()


router.get('/:filename',function(req, res) {
    console.log(req.params.filename);
    fs.readFile(req.params.filename, function(error, data){
        res.sendfile("uploads/"+req.params.filename);
    })
});

module.exports = router;