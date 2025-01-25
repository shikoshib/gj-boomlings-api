/**
 * @typedef {Object} Message
 * @property {string} username - The message sender's username.
 * @property {string} title - The message's title.
 * @property {number} playerID - The message sender's player ID.
 * @property {number} accountID - The message sender's account ID.
 * @property {number} messageID - The message ID.
 * @property {string} age - How long ago the message was sent.
 * @property {boolean} read - Whether the message was already read.
 */
module.exports = {
    /**
     * Gets the list of messages received by a user.
     * @param {string} username - The user's username or player ID.
     * @param {string} password - The user's password.
     * @param {number} page - The page to search through. Defaults to 1.
     * @returns {Message[]}
     */
    getMessages: async function (username, password, page = 1) {
        if (!username) throw new Error("Please provide a player ID or username!");
        if (!password) throw new Error("Please provide a password!");
        if (isNaN(page)) throw new Error("The page should be a number!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        let res = await gjReq("getGJMessages20", {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            secret: "Wmfd2893gb7",
            page: page - 1
        });
        if (res.data == -1 || res.data.startsWith("#")) return [];

        let msgs = res.data.split("#")[0].split("|");
        let result = [];
        msgs.forEach(m => {
            let s = m.split(":");
            result.push({
                username: s[1],
                title: Buffer.from(s[9], "base64").toString(),
                playerID: Number(s[3]),
                accountID: Number(s[5]),
                messageID: Number(s[7]),
                age: s[15],
                read: Boolean(Number(s[11]))
            });
        })

        return result;
    }
}