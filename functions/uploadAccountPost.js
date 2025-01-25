module.exports = {
    /**
     * Uploads a post to an account.
     * @param {string} content - The account post content.
     * @param {string} username - The poster's username or player ID.
     * @param {string} password - The poster's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    uploadAccountPost: async function (content, username, password) {
        if (!content) throw new Error("Please provide an account post content!");
        if (!username) throw new Error("Please provide a user ID or name!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) throw new Error(-1);
        let accID = search.data.split(":")[21];

        let res = await gjReq("uploadGJAccComment20", {
            accountID: accID,
            secret: "Wmfd2893gb7",
            gjp: xor.encrypt(password, 37526),
            comment: Buffer.from(content).toString("base64"),
            cType: 1
        });
        if (res.status == 500) throw new Error("500 Error: couldn't post!");

        return res.data;
    }
}