/**
 * @typedef {Object} LevelScore
 * @property {string} username - The player's username.
 * @property {number} playerID - The player's player ID.
 * @property {number} accountID - The player's account ID.
 * @property {number} rank - The player's ranking on the leaderboard.
 * @property {string} color1 - The player's primary color.
 * @property {string} color2 - The player's secondary color.
 * @property {string} iconID - The player's icon ID.
 * @property {string} iconType - The player's selected game mode to be displayed as an icon.
 * @property {string} glow - Whether the player's icon has the "glow" feature enabled.
 * @property {string} percent - The record's percentage.
 * @property {string} coins - The amount of coins collected.
 * @property {string} age - How long ago the record was published.
 */
module.exports = {
    /**
     * Fetches leaderboards from a specified level.
     * @param {number} level - The level to fetch leaderboards from.
     * @param {("week"|"top"|"player")} type - The leaderboard type. Possible types: \"week\", \"top\", \"friends\".
     * @param {string} username - The user's username or player ID. For whatever reason, RobTop made this required, even for simple fetching.
     * @param {string} password - The user's password. For whatever reason, RobTop made this required, even for simple fetching.
     * @returns {LevelScore[]}
     */
    getLevelScores: async function (level, type, username, password) {
        let types = { week: "2", top: "1", friends: "0" }
        if (!level) throw new Error("Please provide a level ID!");
        if (!types[type.toLowerCase()]) throw new Error("Please provide a valid leaderboard type! Possible types: \"week\", \"top\", \"friends\".")
        if (!username) throw new Error("Please provide a username or a Player ID!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq.js");
        const { rgbToHEX } = require("../misc/rgbToHEX");
        const colors = require("../misc/colors.json");
        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        const XOR = require("../xor.js");
        const xor = new XOR;

        const data = {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            levelID: level,
            secret: "Wmfd2893gb7",
            type: types[type.toLowerCase()]
        }

        let res = await gjReq("getGJLevelScores211", data);

        let scores = res.data.split("|");
        let result = [];

        let iconObj = {
            0: "cube",
            1: "ship",
            2: "ball",
            3: "ufo",
            4: "wave",
            5: "robot",
            6: "spider",
            7: "swing",
            8: "jetpack"
        }

        scores.forEach(sc => {
            let s = sc.split(":");
            result.push({
                username: s[1],
                playerID: Number(s[3]),
                accountID: Number(s[15]),
                rank: Number(s[19]),
                color1: rgbToHEX(colors[username[7]]),
                color2: rgbToHEX(colors[username[9]]),
                iconID: Number(s[5]),
                iconType: iconObj[s[11]],
                glow: s[13] == "2" ? true : false,
                percent: Number(s[17]),
                coins: Number(s[21]),
                age: s[23]
            })
        })

        return result;
    }
}