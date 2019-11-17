const Standing = require('../models/Standing')

module.exports.deleteStandings = (league, season) => {
  return Standing.deleteMany({league_id: league, season: season})
}

module.exports.createStandings = (standingList) => {
  return Standing.create(standingList)
}

module.exports.readStandings = (league, season) => {
  return Standing.find()
    .where('league_id').equals(league)
    .where('season').equals(season)
    .sort('position')
    .select('league_id season position team wins draws losts points scores conceded matches_played goal_difference')
}

module.exports.readTopStandings = (season) => {
  return Standing.find()
    .where('season').equals(season)
    .lte('position', 4)
    .sort('league_id')
    .sort('position')
    .select('-_id league_id season position team wins draws losts points scores conceded matches_played goal_difference')
}
