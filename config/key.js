if(process.env.NODE_ENV === 'production'){
  //production 환경일 때
  module.exports = require('./prod');
}else{
  //dev 환경일 때
  module.exports = require('./dev');
}