module.exports = {
    /**
     * Unblocks a specified user.
     * @param {string} target - The player that needs to be unblocked.
     * @param {string} username - The unblocking person's username or player ID.
     * @param {string} password - The unblocking person's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    unblockUser: async function (target, username, password) {
        if (!target) throw new Error("Please provide a target's player ID or username!");
        if (!username) throw new Error("Please provide a player ID or username!");
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
            str: target,
            secret: "Wmfd2893gb7"
        });
        if (recSearch.data == -1) throw new Error(-1);
        let targetAccID = recSearch.data.split(":")[21];

        const data = {
            secret: "Wmfd2893gb7",
            targetAccountID: targetAccID,
            accountID: userAccID,
            gjp: xor.encrypt(password, 37526)
        }

        let res = await gjReq("unblockGJUser20", data);

        return res.data;
    }
}