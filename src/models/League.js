const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
  league_id: String,
  name: String,
  nation: String,
  uefa_rank: Number
})

global.League = global.League || mongoose.model('League', leagueSchema)
module.exports = global.League
