const commonUtil = require('../common/commonUtil')
const Query = require('./query')

const handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { season } = event.pathParameters
  commonUtil.connect()
    .then(() => {
      return Query.readTopStandings(season)
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
