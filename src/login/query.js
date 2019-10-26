const User = require('../models/User')

module.exports.findUser = (loginId, loginPw) => {
  return User.findOne()
    .where('login_id').equals(loginId)
    .where('login_pw').equals(loginPw)
    .select('login_id user_nm grp_id')
}
