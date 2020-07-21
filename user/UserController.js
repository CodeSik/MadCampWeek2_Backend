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
var User = require('./User');


// User 최초 생성
router.post('/',function(req, res) {
    console.log(req.params.id);
    console.log(req.body.id)
    User.exists({'id': req.body.id}, function (err, result) {
        if (err) return res.status(500).send("User 조회 실패");
        if (result) {
            console.log(req.body.id)
            console.log("User 존재")
            return res.status(404).send("User 있음.");
        }
        if(!result){
            console.log("User 존재 안해서 생성")
            User.create( {
                id: req.body.id,
                name: req.body.name,
                number: req.body.number,
                follow: req.body.follow,
                state: req.body.state,
                photo: req.body.photo
                },
                function(err, user) {
                    if (err) return res.status(500).send("User 생성 실패.");
                    res.status(200).send(user);
                });
            }
            
    })
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
    User.find({'id': req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 조회 실패");
        if (!user) return res.status(404).send("User 없음.");
        res.status(200).send(user);
        
    });
});


//User 삭제
router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    console.log(req.body.id);
    User.findOneAndRemove({'id': req.params.id}, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});
// User 수정
router.put('/:id', function (req, res) {    
    User.findOneAndUpdate({'id': req.params.id}, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
});

module.exports = router;