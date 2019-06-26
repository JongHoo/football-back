const mongoose = require('mongoose')
const Team = require('./models/Team')

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
  const teamListByApi = JSON.parse(event.body)
  console.log('param list : ', teamListByApi)
  connect().then(
    () => {
      // teamListByApi.forEach(item => {
      //   console.log(item)
      //   let team = new Team(item)
      //   return team.save((err) => {
      //     if (err) {
      //       console.log('error!! : ', err)
      //     }
      //   })
      // })
      const team = new Team(teamListByApi[0])
      return team.save()
    }
  )
  .then(team => {
    cb(null, createResponse(200, team))
  })
  .catch(
    e => cb(e)
  )
}

exports.readTeams = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  connect().then(
    () => Team.find().sort({ _id: -1 }).lean().exec()
  ).then(
    team => cb(null, createResponse(200, team))
  )
}
