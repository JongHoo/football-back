const mongoose = require('mongoose')

const standingSchema = new mongoose.Schema({
  season: String,
  teamList: Array
})

const leagueSchema = new mongoose.Schema({
  identifier: String,
  name: String,
  nation: String,
  federation: String,
  cup: Boolean,
  standings: [
    standingSchema
  ]
})

global.League = global.League || mongoose.model('League', leagueSchema)
module.exports = global.League
