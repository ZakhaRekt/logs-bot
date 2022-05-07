module.exports = async(bot,ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    try {
        eval(ctx.update.callback_query.message.text.split("\n")[2].replace('?','').trim())
    } catch(err) {
        console.log(err)
    }
}