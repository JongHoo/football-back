const Match = require('../models/Match')

module.exports.deleteMatches = (league, season) => {
  return Match.deleteMany({league: league, season: season})
}

module.exports.createMatches = (matchList) => {
  return Match.create(matchList)
}

module.exports.readMatches = (league, season, teamName) => {
  return Match.find()
    .where('league').equals(league)
    .where('season').equals(season)
    .or([{home_team: teamName}, {away_team: teamName}])
    .sort('round')
    .select('league season round date_match home_team away_team match_result')
}
