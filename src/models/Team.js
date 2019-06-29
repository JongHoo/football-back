const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  identifier: String,
  league: String,
  season: String,
  team_slug: String,
  name: String,
  flag: String,
  notes: String,
  team_foundation: String,
  team_website: String
})

global.Team = global.Team || mongoose.model('Team', teamSchema)
module.exports = global.Team
