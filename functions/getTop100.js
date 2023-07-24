module.exports = {
    /**
     * Gets the top 100 players.
     */
    getTop100:
        async function() {
            let GJDecode = require("../misc/GJDecode.js");
            const { decScoresUser } = new GJDecode();
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");

            const data = {
                secret: secret,
                type: "top",
                count: 100
            }

            let res = await gjReq("getGJScores20", data);
            if(res.data == "error code: 1005") res = await gjWReq("getTop100");

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