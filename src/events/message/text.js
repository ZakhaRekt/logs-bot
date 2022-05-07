const { Markup } = require('telegraf')
const Stats = require('../../data/stats.js')
const User = require('../../data/user.js')


module.exports = async (bot,ctx) => {
    await ctx.deleteMessage()
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
            await newBotUser.save().then(user => console.log(`Добавлен пользователь: ${user.username}`))
        }
        user.messages++;
        user.lastMessageTime = Date.now();
        if(ctx.message.text.includes('http')) {
            if(ctx.message.text.includes('mega.nz/') || ctx.message.text.includes('dropmefiles.com/')) {
                Stats.find({}, async(err,stats) => {
                    if(err) console.log(err)
                    if(stats.length == 0) {
                        const startStats = new Stats({
                            totalLogs: 1,
                            checkedLogs: 0,
                            onCheakLogs: 1,
                            links: [ctx.message.text]
                        })
                        return await startStats.save().then(stats => console.log(`Добавлена начальная статистика!`))
                    }
                    if(stats[0].links.includes(ctx.message.text)) {
                        return ctx.reply('Ссылка уже была добавлена ранее! Попробуйте другую.')
                    }
                    stats[0].totalLogs++;
                    stats[0].onCheakLogs++;
                    stats[0].links.push(ctx.message.text)
                    await ctx.telegram.sendMessage('634597191', `Логи от пользователя @${ctx.message.from.username} - ${ctx.message.text}`)
                    user.logsSend++;
                    await stats[0].save().then(stats => console.log(`Добавлена статистика!`))
                    await user.save().then(user => console.log(`Обновлен пользователь: ${user.username}`))
                    return await ctx.reply('Принято на отработку!', Markup.inlineKeyboard([
                        [Markup.button.callback('<< Назад', 'backToMenu'), Markup.button.callback('Отправить еще', 'sendMore')]
                    ]))
                })
                return
            }
            return ctx.reply('Неверный формат ссылки')
        }
        await user.save().then(user => console.log(`Обновлен пользователь: ${user.username}`))
    })
}