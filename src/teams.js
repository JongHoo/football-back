const mongoose = require('mongoose')
const Team = require('./models/Team')
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

const createResponse = (status, body) => ({
  statusCode: status,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
  body: JSON.stringify(body)
})

exports.createTeamsByApi = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  let teamListByApi = [] //JSON.parse(event.body)
  const { league, season } = JSON.parse(event.body)
  axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/teams`)
    .then((res) => {
      console.log('response teams : ', res.data.data.teams)
      teamListByApi = res.data.data.teams
      return connect()
    })
    .then(() => {
      let teamList = []
      teamListByApi.forEach(item => {
        let team = new Team(item)
        teamList.push(team)
      })
      return Team.create(teamList)
    })
    .then(data => {
      cb(null, createResponse(200, data))
    })
    .catch((err) => {
      console.log('error! : ', err)
      cb(err)
    })
}

exports.readTeams = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  connect().then(
    () => Team.find().sort({ _id: -1 }).lean().exec()
  ).then(
    team => cb(null, createResponse(200, team))
  )
}
