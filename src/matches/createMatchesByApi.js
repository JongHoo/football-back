const commonUtil = require('../common/commonUtil')
const Match = require('../models/Match')
const extApi = require('../common/extApi')
const _ = require('lodash')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let matchList = []
  const { league, season } = event.pathParameters

  let allRoundApi = []

  for (let i = 1; i <= 38; i++) {
    allRoundApi.push(extApi.getMatches(league, season, i))
  }

  Promise.all(allRoundApi)
    .then(resultArr => {
      for (let i = 0; i < 38; i++) {
        if (_.isEmpty(resultArr[i].data.data.rounds[0].matches)) {
          throw new Error(`no match data`)
        }
        (resultArr[i].data.data.rounds[0].matches).forEach(item => {
          item.league = league
          item.season = season
          item.round = i+1
          let match = new Match(item)
          matchList.push(match)
        })
      }
      return commonUtil.connect()
    })
    .then(() => {
      return Match.deleteMany({league: league, season: season})
    })
    .then(() => {
      return Match.create(matchList)
    })
    .then(data => {
      console.log('Done! all match data inserted')
      cb(null, commonUtil.createResponse(200, 'all match data inserted'))
    })
    .catch(err => {
      console.log('error! : ', err)
    })
}
