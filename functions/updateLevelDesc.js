module.exports = {
    /**
     * Updates the description on a level.
     * @param {number} level - The level ID.
     * @param {string} desc - The new description.
     * @param {string} username - The level uploader's username or player ID.
     * @param {string} password - The level uploader's password.
     * @returns {number} Returns 1 if everything's OK, and -1 if something went wrong.
     */
    updateLevelDesc: async function (level, desc, username, password) {
        if (isNaN(level)) throw new Error("Please provide a valid level ID!");
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

        let res = await gjReq("updateGJDesc20", {
            accountID: accID,
            gjp: xor.encrypt(password, 37526),
            levelID: level,
            levelDesc: Buffer.from(desc).toString("base64"),
            secret: "Wmfd2893gb7"
        });

        return res.data;
    }
}