module.exports = {
    updateLevelDesc: async function (level, desc, user, password) {
        if (isNaN(level)) throw new Error("Please provide a valid level ID!");
        if (!user) throw new Error("Please provide a player ID or name!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: user,
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
        if (res.data == -1) throw new Error("-1: Failed to update the description.");

        return res.data;
    }
}