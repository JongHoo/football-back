const mongoose = require('mongoose')
const League = require('./models/League')
const axios = require('axios')

let connection = null

const connect = () => {
  if (connection && mongoose.connection.readyState === 1) return Promise.resolve(connection)
  return mongoose.connect('mongodb+srv://admin:dnjstnd1@freecluster-lbn7j.mongodb.net/Football-Dataset?retryWrites=true', { useNewUrlParser: true }).then(
    conn => {
      console.log('Atlas Connected!')
      connection = conn
      return connection
    },
    err => {
      console.log('Atlas Connection Failed : ', err)
    }
  )
}

exports.updateStandings = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { league, season } = JSON.parse(event.body)
  axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/standings`)
    .then(response => {
      const standingList = response.data.data.standings
      console.log('standings : ', standingList)

      connect().then(
        () => {
          const League = mongoose.model('league', League)
          League.findOne({})
        }
      ).then(
        league => {
          cb(null, createResponse(200, league))
        }
      ).catch(
        e => cb(e)
      )
    })
}
