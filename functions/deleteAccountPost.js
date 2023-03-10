module.exports = {
    deleteAccountPost:
        async function(id, str, password) {
            if(!id) throw new Error("Please provide an account post ID!");
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
                gjp: xor.encrypt(password, 37526),
                commentID: id,
            };

            let res = await gjReq("deleteGJAccComment20", data);
            if(res.data == -1) throw new Error(-1);

            if(res.data.startsWith("error code")) res = await gjWReq("deleteAccountPost", `?id=${id}&user=${str}&password=${password}`);
            if(res.status == 403) throw new Error(res.data.error);

            return 1;
        }
}