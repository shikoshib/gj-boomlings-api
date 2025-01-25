/**
 * @typedef {Object} ScoresUser
 * @property {string} name - The player's username.
 * @property {number} playerID - The player's player ID.
 * @property {number} accountID - The player's account ID.
 * @property {number} rank - The player's ranking on the leaderboard.
 * @property {number} stars - The amount of stars the player has.
 * @property {number} diamonds - The amount of diamonds the player has.
 * @property {number} secretCoins - The amount of secret coins the player has.
 * @property {number} userCoins - The amount of user coins the player has.
 * @property {number} demons - The amount of demons the player has completed.
 * @property {number} moons - The amount of moons the player has.
 * @property {number} creatorPoints - The amount of creator points the player has.
 */
module.exports = {
    /**
     * Fetches the player leaderboard based on the amount of creator points.
     * @returns {ScoresUser[]}
     */
    getCreatorScores: async function () {
        let GJDecode = require("../misc/GJDecode");
        const { decodeScoresUser } = new GJDecode;
        const { gjReq } = require("../gjReq");

        const data = {
            secret: "Wmfd2893gb7",
            type: "creators",
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