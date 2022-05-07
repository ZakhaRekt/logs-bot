const { Telegraf, Markup } = require('telegraf');
const User = require('../../data/user');
const {isAdmin} = require('../../../functions');

module.exports = (bot,ctx) => {
    if(isAdmin(ctx.message.from.id)) {
        User.find({}, (err, docs) => {
           if(err){
               console.log(`Error: ` + err)
           } else {
             if(docs.length === 0){
                ctx.reply('В базе данных не найдено не одной записи.')
             } else{
               ctx.reply(`В базе сейчас ${docs.length} юзеров!`)
             }
           }
        });
    } else {
        ctx.reply('You don\'t have permissions to run command!')
    }
}