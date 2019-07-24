const commonUtil = require('../common/commonUtil')
const Standing = require('../models/Standing')
const axios = require('axios')
const _ = require('lodash')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let standingListByApi = []
  let standingList = []
  const { league, season } = event.pathParameters

  axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/standings`)
    .then((res) => {
      if (_.isEmpty(res.data.data.standings)) {
        throw new Error('no standing info')
      }
      standingListByApi = res.data.data.standings
      return commonUtil.connect()
    })
    .then(() => {
      standingListByApi.forEach(item => {
        let tempStanding = {
          ...item,
          ...item.overall
        }
        tempStanding.league_id = league
        tempStanding.season = season

        let standing = new Standing(tempStanding)
        standingList.push(standing)
      })
      return Standing.deleteMany({league_id: league, season: season})
    })
    .then(() => {
      return Standing.create(standingList)
    })
    .then(data => {
      cb(null, commonUtil.createResponse(200, data))
    })
    .catch((err) => {
      console.log('error! : ', err)
      cb(err)
    })
}
