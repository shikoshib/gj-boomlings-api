/**
 * @typedef {Object} BlockedUser
 * @property {string} username - The blocked person's username.
 * @property {number} playerID - The blocked person's player ID.
 * @property {number} accountID - The blocked person's account ID.
 * @property {string} color1 - The HEX code of the blocked person's primary color.
 * @property {string} color2 - The HEX code of the blocked person's secondary color.
 */

module.exports = {
    /**
     * Gets the list of people in a user's blacklist.
     * @param {string} username - The user's username or player ID.
     * @param {string} password - The user's password.
     * @returns {BlockedUser[]}
     */
    getBlockedList: async function (username, password) {
        if (!username) throw new Error("Please provide a player ID or username!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        const data = {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            secret: "Wmfd2893gb7",
            type: 1
        }

        let res = await gjReq("getGJUserList20", data);
        if (res.data == -1 || res.data == -2) return [];

        let result = [];

        let colors = require("../misc/colors.json");
        const { rgbToHEX } = require("../misc/rgbToHEX");

        players.forEach(p => {
            let s=p.split(":");
            let username = s[1];
            let playerID = s[3];
            let p1 = s[7];
            let p2 = s[9];
            let accID = s[15];

            result.push({
                username: username,
                playerID: Number(playerID),
                accountID: Number(accID),
                color1: rgbToHEX(colors[p1]),
                color2: rgbToHEX(colors[p2])
            })
        })

        return result;
    }
}