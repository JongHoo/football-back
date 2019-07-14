const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
  identifier: String,
  league: String,
  season: String,
  round: Number,
  date_match: String,
  home_team: String,
  away_team: String,
  match_result: String
})

global.Match = global.Match || mongoose.model('Match', matchSchema)
module.exports = global.Match
