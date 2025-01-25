/**
 * @typedef {Object} Message
 * @property {string} username - The message sender's username.
 * @property {string} title - The message's title.
 * @property {string} content - The message's content.
 * @property {number} playerID - The message sender's player ID.
 * @property {number} accountID - The message sender's account ID.
 * @property {number} messageID - The message ID.
 * @property {string} age - How long ago the message was sent.
 */

module.exports = {
    /**
     * Downloads a message.
     * @param {number} id - The message ID.
     * @param {string} username - The message recipient's username or player ID.
     * @param {string} password - The message recipient's password.
     * @returns {Message}
     */
    dlMessage: async function (id, username, password) {
        if (!id) throw new Error("Please provide a valid message ID!");
        if (!username) throw new Error("Please provide a player ID or username!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return {};
        let accID = search.data.split(":")[21];

        let res = await gjReq("downloadGJMessage20", {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            secret: "Wmfd2893gb7",
            messageID: id
        });
        if (res.data == -1) return {};

        let s = res.data.split(":");
        return {
            username: s[1],
            title: Buffer.from(s[9], "base64").toString(),
            content: xor.decrypt(s[15], 14251),
            playerID: Number(s[3]),
            accountID: Number(s[5]),
            messageID: Number(s[7]),
            age: s[17]
        }
    }
}