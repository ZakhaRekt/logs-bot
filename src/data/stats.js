const mongoose = require('mongoose');
const schema = mongoose.Schema({
    totalLogs: {type: Number, default: 0},
    checkedLogs: {type: Number, default: 0},
    onCheakLogs: {type: Number, default: 0},
    links: {type: Array, default: []},
});
module.exports = mongoose.model("Stats", schema)