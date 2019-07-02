const commonUtil = require('../common/commonUtil')
const Team = require('../models/Team')
const axios = require('axios')
const _ = require('lodash')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let teamListByApi = [] //JSON.parse(event.body)
  let teamList = []
  const { league, season } = event.pathParameters
  axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/teams`)
    .then((res) => {
      console.log('response teams : ', res.data.data.teams)
      if (_.isEmpty(res.data.data.teams)) {
        throw new Error('no teams')
      }
      teamListByApi = res.data.data.teams
      return commonUtil.connect()
    })
    .then(() => {
      teamListByApi.forEach(item => {
        item.league = league
        item.season = season
        let team = new Team(item)
        teamList.push(team)
      })
      return Team.deleteMany({league: league, season: season})
    })
    .then(() => {
      return Team.create(teamList)
    })
    .then(data => {
      cb(null, commonUtil.createResponse(200, data))
    })
    .catch((err) => {
      console.log('error! : ', err)
      cb(err)
    })
}
