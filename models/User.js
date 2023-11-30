const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //스트링 사이 띄어쓰기 제거해주는 역할
    unique: 1 //똑같은 데이터 없도록
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token : {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save',function(next){
  let user = this; //실제 유저 데이터
  let myPlaintextPassword = user.password; //실제 유저 데이터 내부에 있는, 유저가 던져준 패스워드
  
  if (user.isModified('password')){ //유저가 패스워드를 바꿨을 때만 패스워드를 해쉬화 한다
    bcrypt.genSalt(saltRounds, function(err, salt) {
  
      if(err) return next(err);
  
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;// Store hash in your password DB.
        next();
        });
    });

  }else {
    next();
  }

  userSchema.methods.comparePassword = function(plainPassword, cb) {

    //패스워드를 복호화 할 수 없기때문에 plainPassword를 암호화해서 암호화 된 데이터와 일치하는지 판단해야함
    //plainPassword 1234567, 암호화된 비번 $2b$10$8XvQxT48hZ8LNCQU3UuBm.jt4ERBs/ASy6XkPdYzddDbhAuQ8MbTC
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
      if(err) return cb(err),
        cb(null, isMatch)
    })

  }
  

}) //mongoose 메서드 pre()는 따옴표 내부의 메서드 이전에 어떠한 행동을 하게 하는 것임

const User = mongoose.model('User', userSchema)

module.exports = { User }