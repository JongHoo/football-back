const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  league_id: String,
  season: String,
  team_id: String,
  name: String,
  team_website: String
})

global.Team = global.Team || mongoose.model('Team', teamSchema)
module.exports = global.Team
