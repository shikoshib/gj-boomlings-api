module.exports = {
    /**
     * Deletes a comment from a level.
     * @param {number} id - The comment's ID.
     * @param {number} level - The ID of the level which has the comment.
     * @param {string} username - The commenter's username.
     * @param {string} password - The commenter's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    deleteComment:
        async function (id, level, username, password) {
            if (!id) throw new Error("Please provide a comment ID!");
            if (!level) throw new Error("Please provide a level ID!");
            if (!username) throw new Error("Please provide a user ID or name!");
            if (!password) throw new Error("Please provide a password!");

            const { gjReq } = require("../gjReq.js");
            let search = await gjReq("getGJUsers20", {
                str: username,
                secret: "Wmfd2893gb7"
            });
            if (search.data == -1) throw new Error(-1);
            let accID = search.data.split(":")[21];

            const XOR = require("../xor.js");
            const xor = new XOR;

            const res = await gjReq("deleteGJComment20", {
                accountID: accID,
                secret: "Wmfd2893gb7",
                levelID: level,
                gjp: xor.encrypt(password, 37526),
                commentID: id
            });

            return Number(res.data);
        }
}