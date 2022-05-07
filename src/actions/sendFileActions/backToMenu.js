const {Markup} = require('telegraf');
const menu = require('../../../menu');

module.exports = async (bot,ctx) => {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    ctx.reply('Menu', Markup.inlineKeyboard(menu.startMessage))
}