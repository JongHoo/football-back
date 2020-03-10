const commonUtil = require('../common/commonUtil')
const Query = require('./query')
const extApi = require('../common/extApi')
const { isEmpty } = require('lodash')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const teamList = []
  console.log('event : ', event)
  const { league, season } = event

  try {
    const result = await extApi.getTeams(league, season)
    if (isEmpty(result.data.data.teams)) throw new Error('no teams')
    const teamListByApi = result.data.data.teams
    teamListByApi.forEach(item => {
      item.league_id = league
      item.season = season
      item.team_id = item.team_slug
      let team = new Team(item)
      teamList.push(team)
    })

    await commonUtil.connect()
    await Query.deleteTeams(league, season)
    const insertedTeams = await Query.insertTeams(teamList)
    console.log('Success! Data : ', insertedTeams)
    cb(null, commonUtil.createResponse(200, insertedTeams))
  } catch (err) {
    console.log('error! : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
