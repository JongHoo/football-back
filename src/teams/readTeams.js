const commonUtil = require('../common/commonUtil')
const Query = require('./query')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = event.pathParameters
  commonUtil.connect()
    .then(() => {
      return Query.readTeams(league, season)
    })
    .then((teamList) => {
      cb(null, commonUtil.createResponse(200, teamList))
    })
    .catch((err) => {
      console.log('read team error : ', err)
      cb(err)
    })
}
