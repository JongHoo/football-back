const commonUtil = require('../common/commonUtil')
const Standing = require('../models/Standing')
const extApi = require('../common/extApi')
const _ = require('lodash')
const Query = require('./query')

const handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let standingListByApi = []
  let standingList = []
  console.log('event : ', event)
  const { league, season } = event

  extApi.getStandings(league, season)
    .then((res) => {
      if (_.isEmpty(res.data.data.standings)) {
        return Promise.reject('no standing info')
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
      return Query.deleteStandings(league, season)
    })
    .then(() => {
      return Query.createStandings(standingList)
    })
    .then(data => {
      console.log('Success! Data : ', data)
      cb(null, commonUtil.createResponse(200, data))
    })
    .catch(err => {
      console.log('error! : ', err)
      cb(null, commonUtil.createResponse(500, err))
    })
}

module.exports = {
  handle: handle,
  handler: handle
}
