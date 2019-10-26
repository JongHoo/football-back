const commonUtil = require('../common/commonUtil')
const Query = require('./query')
const extApi = require('../common/extApi')
const _ = require('lodash')

exports.handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let teamListByApi = [] //JSON.parse(event.body)
  let teamList = []
  console.log('event : ', event)
  const { league, season } = event

  extApi.getTeams(league, season)
    .then((res) => {
      if (_.isEmpty(res.data.data.teams)) {
        throw new Error('no teams')
      }
      teamListByApi = res.data.data.teams
      return commonUtil.connect()
    })
    .then(() => {
      teamListByApi.forEach(item => {
        item.league_id = league
        item.season = season
        item.team_id = item.team_slug
        let team = new Team(item)
        teamList.push(team)
      })
      return Query.deleteTeams(league, season)
    })
    .then(() => {
      return Query.insertTeams(teamList)
    })
    .then(data => {
      console.log('Success! Data : ', data)
      cb(null, commonUtil.createResponse(200, data))
    })
    .catch((err) => {
      console.log('error! : ', err)
      cb(null, commonUtil.createResponse(500, err))
    })
}
