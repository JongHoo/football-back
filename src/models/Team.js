const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  season: String,
  teamList: Array
})

global.Standing = global.Standing || mongoose.model('Standing', standingSchema)
module.Standing = global.Standing
