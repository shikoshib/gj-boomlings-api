module.exports = {
    deleteLevel: async function (lvl, str, password) {
        if (isNaN(lvl)) throw new Error("Please provide a valid level ID!");
        if (!str) throw new Error("Please provide a user ID or name!");
        if (!password) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: str,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) throw new Error(-1);
        let accID = search.data.split(":")[21];

        let data = {
            accountID: accID,
            secret: "Wmfv2898gc9",
            levelID: lvl,
            gjp: xor.encrypt(password, 37526),
        };

        let res = await gjReq("deleteGJLevelUser20", data);
        if (res.data == -1) throw new Error(-1);

        return res.data;
    }
}