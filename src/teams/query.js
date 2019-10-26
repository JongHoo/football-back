const Team = require('../models/Team')

module.exports.readTeams = (league, season) => {
  return Team.find()
    .where('league_id').equals(league)
    .where('season').equals(season)
    .sort('name')
    .select('league_id season team_id name team_website')
}

module.exports.deleteTeams = (league, season) => {
  return Team.deleteMany({league_id: league, season: season})
}

module.exports.insertTeams = (teamList) => {
  return Team.create(teamList)
}
