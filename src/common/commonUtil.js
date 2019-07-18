const mongoose = require('mongoose')

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
      throw new Error('Atlas Connection Failed : ' + err)
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

exports.connect = connect
exports.createResponse = createResponse
