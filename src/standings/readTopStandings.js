const commonUtil = require('../common/commonUtil')
const Query = require('./query')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { season } = event.pathParameters

  try {
    await commonUtil.connect()
    const standingList = await Query.readTopStandings(season)
    cb(null, commonUtil.createResponse(200, standingList))
  } catch (err) {
    console.log('read standing error : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
