module.exports = {
    deleteAccountPost: async function (id, str, password) {
        if (!id) throw new Error("Please provide an account post ID!");
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

        let res = await gjReq("deleteGJAccComment20", {
            accountID: accID,
            secret: "Wmfd2893gb7",
            gjp: xor.encrypt(password, 37526),
            commentID: id
        });
        if (res.data == -1) throw new Error(-1);

        return res.data;
    }
}