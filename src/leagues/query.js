const League = require('../models/League')

module.exports.readLeagues = () => {
  return League.find()
    .sort('name')
    .select('league_id name nation uefa_rank')
}
