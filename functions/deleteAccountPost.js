module.exports = {
    /**
     * Deletes a post from the user's account.
     * @param {number} id - The post's ID.
     * @param {string} username - The poster's username or player ID.
     * @param {string} password - The poster's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    deleteAccountPost: async function (id, username, password) {
        if (!id) throw new Error("Please provide an account post ID!");
        if (!username) throw new Error("Please provide a player ID or username!");
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

        let res = await gjReq("deleteGJAccComment20", {
            accountID: accID,
            secret: "Wmfd2893gb7",
            gjp: xor.encrypt(password, 37526),
            commentID: id
        });

        return Number(res.data);
    }
}