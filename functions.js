module.exports = {
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    },

    ValidateIPaddress: function (ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        return (false)
    },
    getDateString: function (dateParam) {
        let date = dateParam;
        return `${date.getDate().toString().padStart(2, '0')}.` +
            `${(date.getMonth() + 1).toString().padStart(2, '0')}.` +
            `${date.getFullYear()} ` +
            `${date.getHours().toString().padStart(2, '0')}:` +
            `${date.getMinutes().toString().padStart(2, '0')}:` +
            `${date.getSeconds().toString().padStart(2, '0')}`;
    },
    randomColor: function () {
        return Math.floor(Math.random() * 16777215).toString(16); //random hex for roles
    },
    isAdmin: function(userID) {
        const admins = [
            '634597191',
            '1552571014',
            '78321312'
        ]
        if(!admins.includes(`${userID}`)) {
            return false;
        }
        return true;
    }
};