const {readdirSync} = require('fs');
const ascii = require('ascii-table'); 

let table = new ascii("Commands");
table.setHeading('Command', 'Load status');


module.exports  = (bot) => {
    readdirSync("./src/commands").forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull) {
                bot.command(file.split(".")[0], pull.bind(null,bot)).catch(err => console.log(err));
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌')
            } 
        }
    })
    console.log(table.toString());
}