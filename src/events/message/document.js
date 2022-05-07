const { Telegraf, Markup } = require('telegraf');


module.exports = async(bot, ctx) => {
    await ctx.deleteMessage()
    if (
    !ctx.update.message.document.mime_type.includes('rar') && 
    !ctx.update.message.document.mime_type.includes('zip') &&
    !ctx.update.message.document.mime_type.includes('7z')
    ) {
        return await ctx.reply('Неверный формат файла')
    }
    const link = await ctx.telegram.getFileLink(ctx.update.message.document.file_id);
    const name = await ctx.update.message.document.file_name;
    await ctx.telegram.sendMessage('634597191', `Логи от @${ctx.update.message.from.username} - ${link}`)
    return await ctx.reply(`Принято на отработку ${name}!`, Markup.inlineKeyboard([
        [Markup.button.callback('<< Назад', 'backToMenu'), Markup.button.callback('Отправить еще', 'sendMore')]
    ]))
}