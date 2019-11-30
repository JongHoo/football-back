const commonUtil = require('../common/commonUtil')
const Query = require('./query')

const handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = event.pathParameters
  commonUtil.connect()
    .then(() => {
      return Query.readStandings(league, season)
    })
    .then((standingList) => {
      cb(null, commonUtil.createResponse(200, standingList))
    })
    .catch((err) => {
      console.log('read standing error : ', err)
      cb(null, commonUtil.createResponse(500, err))
    })
}

module.exports = {
  handle: handle,
  handler: handle
}
