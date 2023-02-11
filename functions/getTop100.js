module.exports = {
    getTop100:
        async function() {
            const { decScoresUser } = require("../misc/decScoresUser.js");
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");

            const data = {
                secret: secret,
                type: "top",
                count: 100
            }

            let res = await gjReq("getGJScores20", data);
            if(res.data.startsWith("error code")) res = await gjWReq("getTop100");

            let players = res.data.split("|");
            let emptyElem = players.indexOf(100);

            players.splice(emptyElem, 1);

            let result = [];
            players.forEach(p => {
                result.push(decScoresUser(p));
            });

            return result;
        }
}