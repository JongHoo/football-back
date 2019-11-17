const commonUtil = require('../common/commonUtil')
const League = require('../models/League')
const Query = require('./query')

const handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  commonUtil.connect()
    .then(() => {
      return Query.readLeagues()
    })
    .then((leagueList) => {
      if (leagueList.length < 1) {
        throw new Error('No Leagues')
      }
      cb(null, commonUtil.createResponse(200, leagueList))
    })
    .catch((err) => {
      console.log('read league err : ', err)
      cb(null, commonUtil.createResponse(500, err))
    })
}

module.exports = {
  handle: handle,
  handler: handle
}
