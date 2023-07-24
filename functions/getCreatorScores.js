module.exports = {
    /**
     * Gets the top creators leaderboard.
     */
    getCreatorScores:
        async function() {
            let GJDecode = require("../misc/GJDecode.js");
            const { decScoresUser } = new GJDecode();
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");

            const data = {
                secret: secret,
                type: "creators",
                count: 100
            }

            let res = await gjReq("getGJScores20", data);
            if(res.data == "error code: 1005") {
                res = await gjWReq("getCreatorScores");
                return res.data;
            }

            let players = res.data.split("|");
            let emptyElem = players[100];

            players.splice(emptyElem, 1);

            let result = [];
            players.forEach(p => {
                result.push(decScoresUser(p));
            });

            return result;
        }
}