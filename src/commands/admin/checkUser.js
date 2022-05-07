const { Telegraf, Markup } = require('telegraf');
const User = require('../../data/user');
const {isAdmin} = require('../../../functions');

module.exports = (bot,ctx) => {
    let messageArray = ctx.message.text.split(" ");
    let args = messageArray.slice(1);
    if(isAdmin(ctx.message.from.id)) {
        User.findOne({
            username: args[0],
        }).then((user) => {
            if (!user) {
                ctx.reply('User was not found in Database!')
            } else {
                ctx.replyWithHTML(`<u>ID</u> => <b>${user.ID}</b>\n<u>Username</u> => <b>${user.username}</b>\n<u>First Name</u> => <b>${user.firstName}</b>\n<u>Last Name</u> => <b>${user.lastName ? user.lastName : 'None'}</b>\n<u>Messages</u> => <b>${user.messages}</b>\n<u>Joined</u> => <b>${new Date(user.joinTime).toUTCString()}</b>\n<u>Last Message</u> => <b>${new Date(user.lastMessageTime).toUTCString()}</b>\n<u>Logs Sent</u> => <b>${user.logsSend}</b>`)
            }
        });
    } else {
        ctx.reply('You don\'t have permissions to run this command!')
    }
}