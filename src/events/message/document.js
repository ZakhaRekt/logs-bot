const { Telegraf, Markup } = require('telegraf');


module.exports = async(bot, ctx) => {
    if (
    !ctx.update.message.document.mime_type.includes('rar') && 
    !ctx.update.message.document.mime_type.includes('zip') &&
    !ctx.update.message.document.mime_type.includes('7z')
    ) {
        return await ctx.reply('Неверный формат файла')
    }
    ctx.telegram.forwardMessage('634597191', ctx.update.message.from.id, ctx.update.message.message_id).then(function(){
        ctx.telegram.sendMessage('634597191', `Логи от пользователя @${ctx.message.from.username} - Выше`)
    })
    const name = ctx.update.message.document.file_name;
    return ctx.reply(`Принято на отработку ${name}!`, Markup.inlineKeyboard([
        [Markup.button.callback('<< Назад', 'backToMenu'), Markup.button.callback('Отправить еще', 'sendMore')]
    ]))
}