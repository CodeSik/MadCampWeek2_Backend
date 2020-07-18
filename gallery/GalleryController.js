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


router.use(bodyParser.urlencoded({ extended:true }));
//router.get()
var Gallery = require('./Gallery');


router.post('/img', upload.single('phone'), function (req, res) {
      // req.files는 (String -> Array) 형태의 객체 입니다.
      // 필드명은 객체의 key에, 파일 정보는 배열로 value에 저장됩니다.
      //
      // e.g.
      //  req.files['avatar'][0] -> File
      //  req.files['gallery'] -> Array
      //
      // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.    
            res.json({result:1});
 })


// Gallery 생성
router.post('/', function(req, res) {
    Gallery.create( {
        id: req.body.id,
        photoid: req.body.photoid,
        image: req.body.image,
        contents: req.body.contents,
        like : req.body.like
        },
        function(err, Gallery) {
            if (err) return res.status(500).send("Gallery 생성 실패.");
            res.status(200).send(Gallery);
        });
    console.log("get a file :" + req.body.photoid)
});

// Gallery 전체 조회
router.get('/', function(req, res) {
    Gallery.find( {}, function(err, Gallery) {
        if (err) return res.status(500).send("Gallery 전체 조회 실패.");
        res.status(200).send(Gallery);
    });
});
// Gallery 조회

// router.get('/:id', function(req, res) {
//     Gallery.findById(req.params.id, function (err, Gallery) {
//         if (err) return res.status(500).send("Gallery 조회 실패");
//         if (!Gallery) return res.status(404).send("Gallery 없음.");
//         res.status(200).send(Gallery);
//         console.log(req.params);
//         console.log(req.body)
//     });
// });

//Gallery id로 조회
router.get('/:id', function(req, res) {
    //params는 url로 전달한 파라미터 이다.
    //body는 body로 전달한 것의 key값에 해당하는 값이다.
    console.log(req.params.id);
    console.log(req.body.id)
    Gallery.find({'id': req.params.id}, function (err, Gallery) {
        if (err) return res.status(500).send("Gallery 조회 실패");
        if (!Gallery) return res.status(404).send("Gallery 없음.");
        res.status(200).send(Gallery);
        
    });
});


//Gallery 삭제
router.delete('/:id', function (req, res) {
    Gallery.findOneAndRemove({'photoid': req.params.id}, function (err, Gallery) {
        if (err) return res.status(500).send("Gallery 삭제 실패");
        res.status(200).send("Gallery "+ Gallery.id +" 의 데이터 삭제됨.");
    });
});
// Gallery 수정
router.put('/:id', function (req, res) {    
    Gallery.findOneAndUpdate({'photoid': req.params.id}, req.body, {new: true}, function (err, Gallery) {
        if (err) return res.status(500).send("Gallery 수정 실패.");
        res.status(200).send(Gallery);
    });
});
module.exports = router;