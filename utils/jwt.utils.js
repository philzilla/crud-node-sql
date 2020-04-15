const jwt = require("jsonwebtoken")
const JWT_SIGN_SECRET = 'gdgdf8g48dg4d8g4d68g4d68gd68g4d68g4d68f4g68g468dg486d4gd'
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id
    },
  JWT_SIGN_SECRET,
  {
    expiresIn: '1h'

  })
}} 