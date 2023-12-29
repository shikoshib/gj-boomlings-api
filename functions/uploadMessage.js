module.exports = {
    uploadMessage: async function (receiver, subj, content, user, pass) {
        if (!receiver) throw new Error("Please specify a message receiver!");
        if (!subj) throw new Error("Please specify a message subject!");
        if (!content) throw new Error("Please specify a message content!");
        if (!user) throw new Error("Please provide a username or a player ID!");
        if (!pass) throw new Error("Please provide a password!");

        const { gjReq } = require("../gjReq");
        const XOR = require("../xor");
        const xor = new XOR;

        let userSearch = await gjReq("getGJUsers20", {
            str: user,
            secret: "Wmfd2893gb7"
        });
        if (userSearch.data == -1) throw new Error(-1);
        let userAccID = userSearch.data.split(":")[21];

        let recSearch = await gjReq("getGJUsers20", {
            str: receiver,
            secret: "Wmfd2893gb7"
        });
        if (recSearch.data == -1) throw new Error(-1);
        let recAccID = recSearch.data.split(":")[21];

        let res = await gjReq("uploadGJMessage20", {
            accountID: userAccID,
            toAccountID: recAccID,
            gjp: xor.encrypt(pass, 37526),
            subject: Buffer.from(subj).toString("base64"),
            body: xor.encrypt(content, 14251),
            secret: "Wmfd2893gb7"
        });
        if (res.data == -1) throw new Error(-1);

        return res.data;
    }
}