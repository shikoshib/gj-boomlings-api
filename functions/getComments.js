/**
 * @typedef {Object} Comment
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
 * @property {string|null} mod - Whether the user is a moderator. Returns `null` if not, "mod" if the user is a regular moderator and "elder" if the user is an elder moderator.
 * @property {string|null} color - The comment's text color (usually tied to moderators). Returns `null` if the color is white, otherwise returns the HEX code of the color.
 */
module.exports = {
    /**
     * Gets a list of comments on a level.
     * @param {number} level - The level ID.
     * @param {number} page - The page to search through. Defaults to 1.
     * @param {number} mode - The viewing mode. Can be either 0 (most recent) or 1 (most liked). Defaults to 1.
     * @returns {Comment[]}
     */
    getComments:
        async function (level, page = 1, mode = 1) {
            if (isNaN(level)) throw new Error("Please provide a valid level ID!");
            if (mode && isNaN(mode)) throw new Error("Please provide a mode ID! 0 for recent, 1 for most liked.");

            const { gjReq } = require("../gjReq");
            const { rgbToHEX } = require("../misc/rgbToHEX");
            const colors = require("../misc/colors.json");

            let res = await gjReq("getGJComments21", {
                levelID: level,
                page: Number(page) - 1,
                mode: Number(mode),
                secret: "Wmfd2893gb7"
            });
            if (res.data == -1 || res.data.startsWith("#")) return [];

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
                    content: Buffer.from(comment[1], "base64").toString(),
                    playerID: Number(comment[3]),
                    likes: Number(comment[5]),
                    disliked: comment[5] < 0 ? true : false,
                    percent: Number(comment[9]),
                    id: Number(comment[13]),
                    age: comment[11],
                    username: user[1],
                    iconID: Number(user[3]),
                    color1: rgbToHEX(colors[user[5]]),
                    color2: rgbToHEX(colors[user[7]]),
                    iconType: iconObj[user[9]],
                    glow: Boolean(Number(user[11])),
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