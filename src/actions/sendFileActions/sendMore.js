module.exports = async (bot,ctx) => {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    await ctx.reply('Отправьте файл формата .rar, .zip, .7z или ссылку на mega.nz/dropmefiles:')
}