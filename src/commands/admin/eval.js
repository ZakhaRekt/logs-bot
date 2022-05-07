const {Markup} = require('telegraf');
const {isAdmin} = require('../../../functions');
const User = require('../../data/user');
const menu = require('../../../menu')
module.exports = async(bot,ctx) => {
    let messageArray = ctx.message.text.split(" ");
    let args = messageArray.slice(1);
    if(messageArray.length == 1 || args == '') return
    if(isAdmin(ctx.message.from.id)) {
        await ctx.reply(`Вы уверены что хотите выполнить команду:\n\n ${args.join(' ')}?`, Markup.inlineKeyboard(menu.confirmMessage))
    } else {
        ctx.reply('You don\'t have permissions to run this command!')
    }
}