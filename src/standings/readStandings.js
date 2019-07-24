const commonUtil = require('../common/commonUtil')
const Standing = require('../models/Standing')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season, team } = event.pathParameters
  commonUtil.connect()
    .then(() => {
      return Standing.find()
        .where('league_id').equals(league)
        .where('season').equals(season)
        .sort('position')
        .select('league_id season position team wins draws losts points scores conceded matches_played goal_difference')
    })
    .then((standingList) => {
      cb(null, commonUtil.createResponse(200, standingList))
    })
    .catch((err) => {
      console.log('read standing error : ', err)
      cb(err)
    })
}
