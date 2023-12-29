module.exports = {
    dlMessage: async function (id, user, pass) {
        if (!id) throw new Error("Please provide a valid message ID!");
        if (!user) throw new Error("Please provide a player ID or username!");
        if (!pass) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: user,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return {};
        let accID = search.data.split(":")[21];

        let res = await gjReq("downloadGJMessage20", {
            accountID: accID,
            gjp: xor.encrypt(pass, 37526),
            secret: "Wmfd2893gb7",
            messageID: id
        });
        if (res.data == -1) return {};

        let s = res.data.split(":");
        return {
            username: s[1],
            title: Buffer.from(s[9], "base64").toString(),
            content: xor.decrypt(s[15], 14251),
            playerID: Number(s[3]),
            accountID: Number(s[5]),
            messageID: Number(s[7]),
            age: s[17]
        }
    }
}