const { Telegraf, Markup } = require('telegraf');
const {isAdmin} = require('../../../functions');

module.exports = (bot,ctx) => {
    if(isAdmin(ctx.message.from.id)) {
        console.log(ctx.chat.id)
    }
}
    