module.exports = {
    /**
     * Sends a message.
     * @param {string} recipient - The message recipient.
     * @param {string} subject - The message subject.
     * @param {string} content - The message content.
     * @param {string} username - The sender's username or player ID.
     * @param {string} password - The sender's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    uploadMessage: async function (recipient, subject, content, username, password) {
        if (!recipient) throw new Error("Please specify a message recipient!");
        if (!subject) throw new Error("Please specify a message subject!");
        if (!content) throw new Error("Please specify a message content!");
        if (!username) throw new Error("Please provide a username or a player ID!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let userSearch = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (userSearch.data == -1) throw new Error(-1);
        let userAccID = userSearch.data.split(":")[21];

        let recSearch = await gjReq("getGJUsers20", {
            str: recipient,
            secret: "Wmfd2893gb7"
        });
        if (recSearch.data == -1) throw new Error(-1);
        let recAccID = recSearch.data.split(":")[21];

        let res = await gjReq("uploadGJMessage20", {
            accountID: userAccID,
            toAccountID: recAccID,
            gjp: xor.encrypt(password, 37526),
            subject: Buffer.from(subject).toString("base64"),
            body: xor.encrypt(content, 14251),
            secret: "Wmfd2893gb7"
        });
        if (res.data == -1) throw new Error(-1);

        return res.data;
    }
}