const { Telegraf, Markup } = require('telegraf');
const User = require('../../data/user');
const menu = require('../../../menu')
module.exports = async (bot,ctx) => {
    if(ctx.message.from.is_bot) return;
    if(ctx.message.chat.type != 'private') {
        await ctx.replyWithPhoto({url: 'https://horrorzone.ru/uploads/_pages3/96827/penis_duenn_normalebrille.png'})
        return await ctx.telegram.leaveChat(ctx.message.chat.id);
    }
    User.findOne({ID: ctx.from.id}, async (err, user) => {
        if(err) console.log(err)
        if(!user) {
            const newBotUser = new User({
                ID: ctx.message.from.id,
                username: ctx.message.from.username,
                firstName: ctx.message.from.first_name,
                lastName: ctx.message.from.last_name,
                messages: 1,
                joinTime: Date.now(),
                lastMessageTime: Date.now()
            });
            return await newBotUser.save().then(user => console.log(`Добавлен пользователь: ${user.username}`))
        }
        user.messages++;
        user.lastMessageTime = Date.now();
        await user.save().then(u => console.log(`Пользователь ${u.username} обновлен`))
    })
    await ctx.reply('Menu', Markup.inlineKeyboard(menu.startMessage))
}