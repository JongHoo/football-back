const axios = require('axios')

const urls = {
  getMatches: (league, season, round) => {
    return axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/rounds/round-${round}`)
  },
  getStandings: (league, season) => {
    return axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/standings`)
  },
  getTeams: (league, season) => {
    return axios.get(`http://soccer.sportsopendata.net/v1/leagues/${league}/seasons/${season}/teams`)
  }
}

module.exports = urls
