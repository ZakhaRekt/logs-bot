const mongoose = require('mongoose');
const schema = mongoose.Schema({
    ID: String,
    username: String,
    firstName: String,
    lastName: String,
    messages: {type: Number, default: 0},
    joinTime: {type: Number, default: 0 },
    lastMessageTime: {type: Number, default: 0},
    logsSend: {type: Number, default: 0},
});
module.exports = mongoose.model("User", schema)
