module.exports = {
    /**
     * Deletes a level.
     * @param {number} level - The ID of the level that needs to be deleted.
     * @param {string} username - The uploader's username or player ID.
     * @param {string} password - The uploader's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    deleteLevel: async function (level, username, password) {
        if (isNaN(level)) throw new Error("Please provide a valid level ID!");
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

        let data = {
            accountID: accID,
            secret: "Wmfv2898gc9",
            levelID: level,
            gjp: xor.encrypt(password, 37526),
        };

        let res = await gjReq("deleteGJLevelUser20", data);

        return Number(res.data);
    }
}