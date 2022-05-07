const {Markup} = require('telegraf');

module.exports = async (bot,ctx) => {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    await ctx.reply('Вы можете обратится к @NodeJsD для получения нужной информации')
}