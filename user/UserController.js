var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:true }));

var User = require('./User');


// User 생성
router.post('/', function(req, res) {
    User.create( {
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
        },
        function(err, user) {
            if (err) return res.status(500).send("User 생성 실패.");
            res.status(200).send(user);
        });
});
// User 전체 조회
router.get('/', function(req, res) {
    User.find( {}, function(err, users) {
        if (err) return res.status(500).send("User 전체 조회 실패.");
        res.status(200).send(users);
    });
});
// User 조회

// router.get('/:id', function(req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("User 조회 실패");
//         if (!user) return res.status(404).send("User 없음.");
//         res.status(200).send(user);
//         console.log(req.params);
//         console.log(req.body)
//     });
// });

//User id로 조회
router.get('/:id', function(req, res) {
    //params는 url로 전달한 파라미터 이다.
    //body는 body로 전달한 것의 key값에 해당하는 값이다.
    console.log(req.params.id);
    console.log(req.body.id)
    User.find({'id': req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 조회 실패");
        if (!user) return res.status(404).send("User 없음.");
        res.status(200).send(user);
        
    });
});


//User 삭제
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});
// User 수정
router.put('/:id', function (req, res) {    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
});
module.exports = router;