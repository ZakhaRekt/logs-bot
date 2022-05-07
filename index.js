const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);



mongoose.connect(process.env.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('[✅ DataBase] Connected!')
});
mongoose.connection.on('error', () => {
  console.log('[❌ DataBase] Error Connection!')
});
mongoose.connection.on('disconnected', () => {
  console.log('[❌ DataBase] Disconnected!')
});


['command','events', 'actions'].forEach(handler=> {
    require(`./src/handlers/${handler}`)(bot);
});

bot.telegram.setMyCommands([
    {command: '/start', description: 'Открыть меню'},
    {command: '/send', description: 'Отправить логи на чек'},
])
bot.launch().then(() => console.log('[✅ BOT] Connected!'));
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
