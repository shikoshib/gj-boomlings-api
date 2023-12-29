module.exports = {
    getMessages: async function (user, pass, page = 1) {
        if (!user) throw new Error("Please provide a player ID or username!");
        if (!pass) throw new Error("Please provide a password!");
        if (isNaN(page)) throw new Error("The page should be a number!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let search = await gjReq("getGJUsers20", {
            str: user,
            secret: "Wmfd2893gb7"
        });
        if (search.data == -1) return [];
        let accID = search.data.split(":")[21];

        let res = await gjReq("getGJMessages20", {
            accountID: accID,
            gjp: xor.encrypt(pass, 37526),
            secret: "Wmfd2893gb7",
            page: page - 1
        });
        if (res.data == -1 || res.data.startsWith("#")) return [];

        let msgs = res.data.split("#")[0].split("|");
        let result = [];
        msgs.forEach(m => {
            let s = m.split(":");
            result.push({
                username: s[1],
                title: Buffer.from(s[9], "base64").toString(),
                playerID: Number(s[3]),
                accountID: Number(s[5]),
                messageID: Number(s[7]),
                age: s[15],
                read: Boolean(Number(s[11]))
            });
        })

        return result;
    }
}