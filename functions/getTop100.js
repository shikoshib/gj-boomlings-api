module.exports = {
    getTop100: async function () {
        let GJDecode = require("../misc/GJDecode");
        const { decodeScoresUser } = new GJDecode;
        const { gjReq } = require("../gjReq");

        const data = {
            secret: "Wmfd2893gb7",
            type: "top",
            count: 100
        }

        let res = await gjReq("getGJScores20", data);

        let players = res.data.split("|");
        players.pop();

        let result = [];
        players.forEach(p => {
            result.push(decodeScoresUser(p));
        });

        return result;
    }
}