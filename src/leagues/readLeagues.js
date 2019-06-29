const commonUtil = require('../common/commonUtil')
const League = require('../models/League')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  commonUtil.connect()
    .then(() => {
      return League.find()
        .sort('name')
        .select('identifier name short_name nation federation')
    })
    .then((leagueList) => {
      cb(null, commonUtil.createResponse(200, leagueList))
    })
    .catch((err) => {
      console.log('read league err : ', err)
      cb(err)
    })
}
