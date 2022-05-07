const { Telegraf, Markup } = require('telegraf');
const User = require('../../data/user');
const {isAdmin} = require('../../../functions');

module.exports = (bot,ctx) => {
    let messageArray = ctx.message.text.split(" ");
    let args = messageArray.slice(1);
    if(isAdmin(ctx.message.from.id)) {
        if(!args[0]) return ctx.reply('Send username as argument to update.')
        if(!args[1]) return ctx.reply('[ 1 - Messages, 2 - LogsSend, 3 - Username ]')
        if(isNaN(+args[1])) return ctx.reply('Only number is avaible in second parametr')
        if(!args[2]) return ctx.reply('Enter the new value!')
        
        User.findOne({
            username: args[0],
        }).then((user) => {
            if (!user) {
                ctx.reply('Not member in DB for specified username!')
            } else {
                switch(+args[1]) {
                    case 1:
                        if(isNaN(+args[2])) return ctx.reply('For Messages edition only number specified!')
                        ctx.reply(`Sucsessful changed Messages \'${user.messages}\' to \`${args[2]}\``)
                        user.messages = args[2];
                        return user.save();
                    case 2:
                        if(isNaN(+args[2])) return ctx.reply('For LogsSend edition only number specified!')
                        ctx.reply(`Sucsessful changed LogsSend \'${user.logsSend}\' to \`${args[2]}\``)
                        user.logsSend = args[2];
                        return user.save();
                    case 3:
                        ctx.reply(`Sucsessful changed Username from \'${user.username}\' to \`${args[2]}\``)
                        user.username = args[2];
                        return user.save();
                    default:
                        break;
                }
            }
        });
    } else {
        ctx.reply('You don\'t have permissions to run command!')
    }
}