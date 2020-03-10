const commonUtil = require('../common/commonUtil')
const Query = require('./query')
const qs = require('querystring')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { loginId, loginPw } = qs.parse(event.body)

  try {
    await commonUtil.connect()
    const user = await Query.findUser(loginId, loginPw)
    if (!user) throw new Error('ID or PW mismatch')
    console.log(`login success : ${user.login_id}`)
    cb(null, commonUtil.createResponse(200, user))
  } catch (err) {
    console.log('Login Error : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
