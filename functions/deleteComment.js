module.exports = {
    deleteComment:
        async function(id, lvl, str, password) {
            if(!id) throw new Error("Please provide a comment ID!");
            if(!lvl) throw new Error("Please provide a level ID!");
            if(!str) throw new Error("Please provide a user ID or name!");
            if(!password) throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            let data = {
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                levelID: lvl,
                gjp: xor.encrypt(password, 37526),
                commentID: id,
            };

            let res = await gjReq("deleteGJComment20", data);
            if(res.data == -1) throw new Error(-1);

            return 1;
        }
}