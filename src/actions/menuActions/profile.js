const {Markup} = require('telegraf');
const User = require('../../data/user')
module.exports = async (bot,ctx) => {
    await ctx.answerCbQuery()
    await ctx.deleteMessage()
    User.findOne({ID: ctx.from.id}, async (err, user) => {
        if(err) console.log(err)
        if(!user) {
            return
        }
        await ctx.reply(`Профиль пользователя ${ctx.update.callback_query.from.username}\n\n - Имя: ${ctx.update.callback_query.from.first_name}\n - Фамилия: ${ctx.update.callback_query.from.last_name}\n - Ссылка на профиль: https://t.me/${ctx.update.callback_query.from.username}\n - Материала отправлено: ${user.logsSend}\n - Сообщений за все время: ${user.messages}\n - Время последнего сообщения: ${new Date(user.lastMessageTime).toLocaleString()}\n - Время присоединения: ${new Date(user.joinTime).toLocaleString()}`, 
        Markup.inlineKeyboard([
            [Markup.button.callback('<< Назад', 'backToMenu')],
        ]))
    })
}