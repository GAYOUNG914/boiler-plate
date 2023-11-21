const express = require('express')//package.json에서 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser'); //package.json에서 가져옴
const { User } = require("./models/User");

const config = require('./config/key');

// bodyParser 옵션주기
//application/x-www-form-urlencoded 와 같은 데이터 형식을 파싱할 수 있게하는 옵션
app.use(bodyParser.urlencoded({extended: true}));

//application/json과 같은 데이터 형식을 파싱할 수 있게 하는 옵션
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('mongoose connected'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! as sdfasdfa.srgsdfhsdfasdfsadfafgkhksf')
})

// register router 만들기
app.post('/register', (req, res) => {

  // 회원가입 할 때 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다

  //bodyParser가 있기 때문에 req.body 라는 값(회원정보에 관한 값)을 들고올 수 있다
  const user = new User(req.body)

  // user.save((err, userInfo) => {//.save()는 몽고db 내장함수
  //   if (err) return res.json({ success: false, err}) //데이터 가져오기 실패 시 에러 찍어주기
  //   return res.status(200).json({ //status(200)은 데이터 가져오는데 성공했단 뜻임
  //       success: true
  //   })
  // })

  // 강의에서의 MongoDB의 함수의 권장방식이 최근에 바뀌어서 그 부분을 권장방식에 맞춰서 다시 적어올린겁니다.
  user.save().then(()=>{ //.save()는 몽고db 내장함수
    res.status(200).json({ //status(200)은 데이터 가져오는데 성공했단 뜻임
        success:true
    })
  }).catch((err)=>{ //데이터 가져오기 실패 시 에러 찍어주기
      return res.json({success:false,err})
  });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})