const commonUtil = require('../common/commonUtil')
const League = require('../models/League')
const Query = require('./query')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false

  try {
    await commonUtil.connect()
    const leagueList = await Query.readLeagues()
    if (leagueList.length === 0) throw new Error('No Leagues')
    cb(null, commonUtil.createResponse(200, leagueList))
  } catch (err) {
    console.log('read league err : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
