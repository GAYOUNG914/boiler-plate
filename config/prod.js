module.exports = {
  //heroku에서 가져옴. 여기서 .MONGO_URL는 내가 헤로쿠의 config vars에 기입해놨던 이름임
  mongoURI: process.env.MONGO_URI
}