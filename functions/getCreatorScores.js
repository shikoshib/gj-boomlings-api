module.exports = {
    getCreatorScores:
        async function() {
            const { decodeUserResult } = require("../misc/decodeUserResult.js");
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");

            const data = {
                secret: secret,
                type: "creators",
                count: 100
            }

            let res = await axios.post(server + "getGJScores20.php", data, {
                headers: headers
            })

            let players = res.data.split("|");
            let emptyElem = players.indexOf(100);

            players.splice(emptyElem, 1);

            let result = [];
            players.forEach(p => {
                result.push(decodeUserResult(p));
            });

            return result;
        }
}