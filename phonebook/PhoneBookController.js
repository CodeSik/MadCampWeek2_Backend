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
var PhoneBook = require('./Phonebook');



// PhoneBook 생성 (제일 처음 기본. 사진 업로드 할때는 바뀌게 할 예정)
router.post('/' ,function(req, res) {
    console.log(req.body.id)
    console.log(req.body.name)
    console.log(req.body.number)
    console.log(req.body.photoid)
    PhoneBook.exists({'id': req.body.id, 'name':req.body.name, 'number': req.body.number}, function (err, result) {
        if (err) return res.status(500).send("User 조회 실패");
        if (result) {
            console.log(req.body.id)
            console.log("존재")
            return res.status(404).send("User 있음.");
        }
        if(!result){
             PhoneBook.create( {
             id: req.body.id,
             name: req.body.name,
             number: req.body.number,
             photo: req.body.photo
            },
             function(err, PhoneBook) {
                 if (err) return res.status(500).send("PhoneBook 생성 실패.");
                 res.status(200).send(PhoneBook);
             });
        }
    })
});

router.post('/upload', function(req, res) {
             PhoneBook.create( {
             id: req.body.id,
             name: req.body.name,
             number: req.body.number,
             photoid: req.body.photoid,
            },
             function(err, PhoneBook) {
                 if (err) return res.status(500).send("PhoneBook 생성 실패.");
                 res.status(200).send(PhoneBook);
             });
});

// PhoneBook 전체 조회
router.get('/', function(req, res) {
    PhoneBook.find( {}, function(err, PhoneBook) {
        if (err) return res.status(500).send("PhoneBook 전체 조회 실패.");
        res.status(200).send(PhoneBook);
    });
});
// PhoneBook 조회

// router.get('/:id', function(req, res) {
//     PhoneBook.findById(req.params.id, function (err, PhoneBook) {
//         if (err) return res.status(500).send("PhoneBook 조회 실패");
//         if (!PhoneBook) return res.status(404).send("PhoneBook 없음.");
//         res.status(200).send(PhoneBook);
//         console.log(req.params);
//         console.log(req.body)
//     });
// });

//PhoneBook id로 조회
router.get('/:id', function(req, res) {
    //params는 url로 전달한 파라미터 이다.
    //body는 body로 전달한 것의 key값에 해당하는 값이다.

    PhoneBook.find({'id': req.params.id}, function (err, PhoneBook) {
        if (err) return res.status(500).send("PhoneBook 조회 실패");
        if (!PhoneBook) return res.status(404).send("PhoneBook 없음.");
        res.status(200).send(PhoneBook);
        
    });
});


//PhoneBook 삭제
router.delete('/:id/:name', function (req, res) {
    console.log(req.params.id);
    console.log(req.params.name);
    PhoneBook.findOneAndRemove({'id': req.params.id,'name': req.params.name}, function (err, PhoneBook) {
        if (err) return res.status(500).send("PhoneBook 삭제 실패");
        res.status(200).send("PhoneBook "+ PhoneBook.id +" 의 데이터 삭제됨.");
    });
});
// PhoneBook 수정
router.put('/:id/:name', function (req, res) {    
    PhoneBook.findOneAndUpdate({'id': req.params.id,'name': req.params.name}, req.body, {new: true}, function (err, PhoneBook) {
        if (err) return res.status(500).send("PhoneBook 수정 실패.");
        res.status(200).send(PhoneBook);
    });
});
module.exports = router;