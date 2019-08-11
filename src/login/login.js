const commonUtil = require('../common/commonUtil')
const User = require('../models/User')
const qs = require('querystring')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { loginId, loginPw } = qs.parse(event.body)
  commonUtil.connect()
    .then(() => {
      return User.findOne()
        .where('login_id').equals(loginId)
        .where('login_pw').equals(loginPw)
        .select('login_id user_nm grp_id')
    })
    .then((user) => {
      if (!user) {
        throw new Error('ID or PW mismatch')
      } else {
        console.log(`login success : ${user.login_id}`)
        cb(null, commonUtil.createResponse(200, user))
      }
    })
    .catch(err => {
      console.log('Login Error : ', err)
      cb(null, commonUtil.createResponse(500, err))
    })
}
