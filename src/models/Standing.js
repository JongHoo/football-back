const mongoose = require('mongoose')

const standingSchema = new mongoose.Schema({
  league_id: String,
  season: String,
  team: String,
  position: Number,
  wins: Number,
  draws: Number,
  losts: Number,
  points: Number,
  scores: Number,
  conceded: Number,
  matches_played: Number,
  goal_difference: Number
})

global.Standing = global.Standing || mongoose.model('Standing', standingSchema)
module.exports = global.Standing
