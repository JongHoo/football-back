const commonUtil = require('../common/commonUtil')
const Query = require('./query')
const qs = require('querystring')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { loginId, loginPw } = qs.parse(event.body)
  commonUtil.connect()
    .then(() => {
      return Query.findUser(loginId, loginPw)
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
