const commonUtil = require('../common/commonUtil')
const Query = require('./query')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season, team } = event.pathParameters
  const teamName = team.replace(/%20/gi, ' ')
  commonUtil.connect()
    .then(() => {
      return Query.readMatches(league, season, teamName)
    })
    .then((matchList) => {
      cb(null, commonUtil.createResponse(200, matchList))
    })
    .catch((err) => {
      console.log('read team error : ', err)
      cb(err)
    })
}
