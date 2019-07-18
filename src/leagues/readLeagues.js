const commonUtil = require('../common/commonUtil')
const League = require('../models/League')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  commonUtil.connect()
    .then(() => {
      return League.find()
        .sort('name')
        .select('league_id name nation uefa_rank')
    })
    .then((leagueList) => {
      if (leagueList.length < 1) {
        throw new Error('No Leagues')
      }
      cb(null, commonUtil.createResponse(200, leagueList))
    })
    .catch((err) => {
      console.log('read league err : ', err)
      cb(err)
    })
}
