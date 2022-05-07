const {Markup} = require('telegraf');
module.exports = Object.freeze({
    startMessage: [
        [Markup.button.callback('Профиль', 'profile'), Markup.button.callback('Отправить логи', 'sendMore')],
        [Markup.button.callback('Тех. поддержка', 'tehSupport')],
    ],
    confirmMessage: [
        [Markup.button.callback('Да', 'confirm'), Markup.button.callback('Нет', 'cancel')],
    ]
})