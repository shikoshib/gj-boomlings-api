module.exports = {
    /**
     * Posts a comment on a level.
     * @param {string} comment - The comment content.
     * @param {number} level - The level ID.
     * @param {string} username - The commenter's username or player ID.
     * @param {string} password - The commenter's password.
     * @param {number} percent - The achieved level percentage to be displayed on the comment.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    uploadComment: async function (comment, level, username, password, percent = 0) {
        if (!comment) throw new Error("Please provide a comment!");
        if (!level) throw new Error("Please provide a level ID!");
        if (!username) throw new Error("Please provide a username or a player ID!");
        if (!password) throw new Error("Please provide a password!");
        if (Number(percent) > 100) throw new Error("The percentage cannot be more than 100!");

        const { gjReq } = require("../gjReq.js");
        const crypto = require('crypto')

        function sha1(data) { return crypto.createHash("sha1").update(data, "binary").digest("hex"); }

        let search = await gjReq("getGJUsers20", {
            str: username,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) throw new Error(-1);
        let username = search.data.split(":")[1];
        let accID = search.data.split(":")[21];

        const XOR = require("../xor.js");
        const xor = new XOR;

        let chkStr = username.toLowerCase() + Buffer.from(comment).toString("base64") + level + percent + "0xPT6iUrtws0J";
        let chk = xor.encrypt(sha1(chkStr), 29481);

        let res = await gjReq("uploadGJComment21", {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            userName: username.toLowerCase(),
            comment: Buffer.from(comment).toString("base64"),
            levelID: level,
            percent: percent,
            chk: chk,
            secret: "Wmfd2893gb7"
        });

        if (res.data == -1) throw new Error("Whoops, the servers have rejected your request!");
        if (res.data == -10) throw new Error("You're permanently banned from commenting!");
        if (res.data.startsWith("temp_")) throw new Error(`You're temporarily banned from commenting!\nBan duration: ${res.data.split("_")[1]} seconds\nReason: ${res.data.split("_")[2]}`);

        return res.data;
    }
}