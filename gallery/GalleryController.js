var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:true }));
//router.get()
var Gallery = require('./Gallery');


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