module.exports = {
    deleteComment:
        async function (id, lvl, str, password) {
            if (!id) throw new Error("Please provide a comment ID!");
            if (!lvl) throw new Error("Please provide a level ID!");
            if (!str) throw new Error("Please provide a user ID or name!");
            if (!password) throw new Error("Please provide a password!");

            const { gjReq } = require("../gjReq.js");
            let search = await gjReq("getGJUsers20", {
                str: str,
                secret: "Wmfd2893gb7"
            });
            if (search.data == -1) throw new Error(-1);
            let accID = search.data.split(":")[21];

            const XOR = require("../xor.js");
            const xor = new XOR;

            const res = await gjReq("deleteGJComment20", {
                accountID: accID,
                secret: "Wmfd2893gb7",
                levelID: lvl,
                gjp: xor.encrypt(password, 37526),
                commentID: id
            });
            if (res.data == -1) throw new Error(-1);

            return res.data;
        }
}