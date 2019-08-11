const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login_id: String,
  user_nm: String,
  grp_id: String,
  login_pw: String
})

global.User = global.User || mongoose.model('User', userSchema)
module.exports = global.User
