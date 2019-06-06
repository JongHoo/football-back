const mongoose = require('mongoose')
const League = require('./models/League')

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

exports.createLeague = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const { identifier, name, nation, federation, cup } = JSON.parse(event.body)
  connect().then(
    () => {
      const league = new League({ identifier, name, nation, federation, cup })
      return league.save()
    }
  ).then(
    league => {
      cb(null, createResponse(200, league))
    }
  ).catch(
    e => cb(e)
  )
}

exports.readLeagues = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false
  connect().then(
    () => League.find().sort({ _id: -1 }).lean().exec()
  ).then(
    league => cb(null, createResponse(200, league))
  )
}

exports.readLeague = (event, ctx, cb) => {
  cb(null, createResponse(200, {message: 'read'}))
}

exports.updateLeague = (event, ctx, cb) => {
  cb(null, createResponse(200, {message: 'update'}))
}

exports.deleteLeague = (event, ctx, cb) => {
  cb(null, createResponse(200, {message: 'delete'}))
}
