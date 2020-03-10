const commonUtil = require('../common/commonUtil')
const axios = require('axios')
const Query = require('../standings/query')
const Constants = require('../common/constants')

const handle = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = JSON.parse(event.body)
  commonUtil.connect()
    .then(() => {
      return Query.readStandings(league, season)
    })
    .then((standingList) => {
      if (!standingList || !standingList.length === 0) {
        return Promise.reject(new Error('Error ::: no football data'))
      }
      const rawData = standingList.map(team => `${team.position}위: ${team.team} ${team.points}`)
      const text = rawData.join('\n')

      return axios.post(Constants.SLACK_INCOMMING_WEBHOOK_URL, JSON.stringify({text: text}))
    })
    .then(() => {
      console.log('Successfully Send to Slack')
      cb(null, commonUtil.createResponse(200, 'Successfully Send to Slack'))
    })
    .catch((err) => {
      console.log('read standing error : ', err)
      cb(null, commonUtil.createResponse(500, err.message))
    })
}

module.exports = {
  handle: handle,
  handler: handle
}
