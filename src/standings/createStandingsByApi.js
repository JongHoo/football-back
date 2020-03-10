const commonUtil = require('../common/commonUtil')
const Standing = require('../models/Standing')
const extApi = require('../common/extApi')
const { isEmpty } = require('lodash')
const Query = require('./query')

const handle = async (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const standingList = []
  console.log('event : ', event)
  const { league, season } = event

  try {
    const result = await extApi.getStandings(league, season)
    if (isEmpty(result.data.data.standings)) throw new Error('no standing info')
    const standingListByApi = result.data.data.standings

    await commonUtil.connect()
    standingListByApi.forEach(item => {
      let tempStanding = {
        ...item,
        ...item.overall,
        league_id: league,
        season
      }
      let standing = new Standing(tempStanding)
      standingList.push(standing)
    })
    await Query.deleteStandings(league, season)
    const insertedStandings = await Query.createStandings(standingList)
    console.log('Success! Data : ', insertedStandings)
    cb(null, commonUtil.createResponse(200, insertedStandings))
  } catch (err) {
    console.log('error! : ', err)
    cb(null, commonUtil.createResponse(500, err.message))
  }
}

module.exports = {
  handle: handle,
  handler: handle
}
