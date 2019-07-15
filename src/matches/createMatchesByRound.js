const commonUtil = require('../common/commonUtil')
const Match = require('../models/Match')
const axios = require('axios')
const _ = require('lodash')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let matchListByApi = []
  let matchList = []
  const { league, season, round } = event.pathParameters

  axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/rounds/round-${round}`)
    .then((res) => {
      if (_.isEmpty(res.data.data.rounds[0].matches)) {
        throw new Error('no matches')
      }
      matchListByApi = res.data.data.rounds[0].matches
      return commonUtil.connect()
    })
    .then(() => {
      matchListByApi.forEach(item => {
        item.league = league
        item.season = season
        item.round = round
        let match = new Match(item)
        matchList.push(match)
      })
      return Match.deleteMany({league: league, season: season, round: round})
    })
    .then(() => {
      return Match.create(matchList)
    })
    .then(data => {
      cb(null, commonUtil.createResponse(200, data))
    })
    .catch((err) => {
      console.log('error! : ', err)
      cb(err)
    })
}

