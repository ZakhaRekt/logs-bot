const {readdirSync} = require('fs');
module.exports = (bot) => {
    const load = dirs => {
        const events = readdirSync(`./src/actions/${dirs}`).filter(d => d.endsWith('.js'));
        for(let file of events) {
            const evt = require(`../actions/${dirs}/${file}`);
            let eName = file.split('.')[0];
            bot.action(eName,evt.bind(null,bot));
        }
    }
    ["menuActions","sendFileActions"].forEach(x => load(x));
    console.log('Actions загружены!')
}