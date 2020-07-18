var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:true }));
//router.get()
var PhoneBook = require('./Phonebook');


// PhoneBook 생성
router.post('/', function(req, res) {
    console.log(req.body.id)
    console.log(req.body.name)
    console.log(req.body.number)
    console.log(req.body.photoid)
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