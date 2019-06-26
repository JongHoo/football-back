const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
  identifier: String,
  name: String,
  nation: String,
  federation: String,
  cup: Boolean
})

global.League = global.League || mongoose.model('League', leagueSchema)
module.exports = global.League
