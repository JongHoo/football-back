const commonUtil = require('../common/commonUtil')
const Team = require('../models/Team')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = event.pathParameters
  commonUtil.connect()
    .then(() => {
      return Team.find()
        .where('league').equals(league)
        .where('season').equals(season)
        .sort('name')
        .select('identifier name team_slug team_foundation team_website')
    })
    .then((teamList) => {
      cb(null, commonUtil.createResponse(200, teamList))
    })
    .catch((err) => {
      console.log('read team error : ', err)
      cb(err)
    })
}
