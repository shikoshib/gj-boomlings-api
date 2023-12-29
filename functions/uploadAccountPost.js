module.exports = {
    uploadAccountPost: async function (content, str, password) {
        if (!content) throw new Error("Please provide an account post content!");
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

        let res = await gjReq("uploadGJAccComment20", {
            accountID: accID,
            secret: "Wmfd2893gb7",
            gjp: xor.encrypt(password, 37526),
            comment: Buffer.from(content).toString("base64"),
            cType: 1
        });
        if (res.status == 500) throw new Error("500 Error: couldn't post!");

        return res.data;
    }
}