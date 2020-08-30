var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statsSchema = new Schema({
  activeUsers: Number
}, { collection: "stats" });

const Stats = mongoose.model("Stats", roomSchema);

module.exports = Stats;