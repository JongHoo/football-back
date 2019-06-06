const mongoose = require('mongoose')

const standingSchema = new mongoose.Schema({
  season: String,
  teamList: Array
})

global.Standing = global.Standing || mongoose.model('Standing', standingSchema)
module.Standing = global.Standing
