/**
 * @typedef {Object} Comment
 * @property {number} levelID - The ID of a level the comment was left on.
 * @property {string} content - The comment's content.
 * @property {number} likes - The amount of likes the comment has.
 * @property {boolean} disliked - Whether the comment is disliked (i.e. if the likes count is less than 0).
 * @property {number} percent - The achieved level percentage at the time of publishing the comment.
 * @property {number} id - The comment's ID.
 * @property {string} age - How long ago the comment was published.
 * @property {string} username - The commenter's username.
 * @property {string} iconID - The commenter's icon ID.
 * @property {string} color1 - The commenter's primary color.
 * @property {string} color2 - The commenter's secondary color.
 * @property {string} iconType - The commenter's selected game mode to be displayed as an icon.
 * @property {number} glow - Whether the commenter's icon has the "glow" feature enabled.
 * @property {number} playerID - The commenter's player ID.
 * @property {number} accountID - The commenter's account ID.
 * @property {string|null} mod - Whether the commenter is a moderator. Returns `null` if not, "mod" if the user is a regular moderator and "elder" if the user is an elder moderator.
 * @property {string|null} color - The comment's text color (usually tied to moderators). Returns `null` if the color is white, otherwise returns the HEX code of the color.
 */
module.exports = {
    /**
     * Gets the comment history of a user.
     * @param {string} username - The target's username or player ID.
     * @param {number} page - The page to search through. Defaults to 1.
     * @param {number} mode - The viewing mode. Can be either 0 (most recent) or 1 (most liked). Defaults to 1.
     * @returns {Comment[]}
     */
    getCommentHistory: async function (username, page = 1, mode = 1) {
        if (!username) throw new Error("Please provide a player ID or name!");
        if (page && isNaN(page)) throw new Error("Please provide a page!");
        if (mode && isNaN(mode)) throw new Error("Please provide a valid mode ID! 0 for recent, 1 for most liked.");

        const { gjReq } = require("../gjReq.js");
        const { getProfile } = require("./getProfile.js");
        const { rgbToHEX } = require("../misc/rgbToHEX");
        const colors = require("../misc/colors.json");

        const user = await getProfile(username);
        if (user.commentHistory != "all") throw new Error("Whoops! This user has disabled viewing his comment history!");

        let res = await gjReq("getGJCommentHistory", {
            secret: "Wmfd2893gb7",
            userID: user.playerID,
            page: Number(page) - 1,
            mode: Number(mode)
        });
        if (res.data == -1) return [];

        let comments = res.data.split("#")[0].split("|");
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

        comments.forEach(c => {
            let comment = c.split(":")[0].split("~");
            let user = c.split(":")[1].split("~");
            let obj = {
                levelID: Number(comment[3]),
                content: Buffer.from(comment[1], "base64").toString(),
                likes: Number(comment[7]),
                disliked: comment[7] < 0 ? true : false,
                percent: Number(comment[9]),
                id: Number(comment[13]),
                age: comment[11],
                username: user[1],
                iconID: Number(user[3]),
                color1: rgbToHEX(colors[user[5]]),
                color2: rgbToHEX(colors[user[7]]),
                iconType: iconObj[user[9]],
                glow: Boolean(Number(user[11])),
                playerID: Number(comment[5]),
                accountID: Number(user[13]),
                mod: null,
                color: null
            };
            if (comment.length > 14) {
                obj.mod = comment[15] == "1" ? "mod" : "elder";
                obj.color = rgbToHEX(comment[17]);
            }
            result.push(obj);
        })

        return result;
    }
}