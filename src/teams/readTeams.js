const commonUtil = require('../common/commonUtil')
const Query = require('./query')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = event.pathParameters

  try {
    await commonUtil.connect()
    const teamList = await Query.readTeams(league, season)
    cb(null, commonUtil.createResponse(200, teamList))
  } catch (err) {
    console.log('read team error : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
