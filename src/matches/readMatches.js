const commonUtil = require('../common/commonUtil')
const Query = require('./query')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season, team } = event.pathParameters
  const teamName = team.replace(/%20/gi, ' ')

  try {
    await commonUtil.connect()
    const matchList = await Query.readMatches(league, season, teamName)
    cb(null, commonUtil.createResponse(200, matchList))
  } catch (err) {
    console.log('read team error : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
