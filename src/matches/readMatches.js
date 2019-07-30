const commonUtil = require('../common/commonUtil')
const Match = require('../models/Match')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season, team } = event.pathParameters
  const teamName = team.replace(/%20/gi, ' ')
  commonUtil.connect()
    .then(() => {
      return Match.find()
        .where('league').equals(league)
        .where('season').equals(season)
        .or([{home_team: teamName}, {away_team: teamName}])
        .sort('round')
        .select('league season round date_match home_team away_team match_result')
    })
    .then((matchList) => {
      cb(null, commonUtil.createResponse(200, matchList))
    })
    .catch((err) => {
      console.log('read team error : ', err)
      cb(err)
    })
}
