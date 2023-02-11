module.exports = {
    uploadAccountPost:
        async function(content, str, password) {
            const {encB64} = require("../misc/encB64.js");
            if(!content) throw new Error("Please provide an account post content!");
            if(!str) throw new Error("Please provide a user ID or name!");
            if(!password) throw new Error("Please provide a password!");
            
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();
            
            const comment = encB64(content);

            let uACdata = {
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                gjp: xor.encrypt(password, 37526),
                comment: comment,
                cType: 1
            };

            let res = await gjReq("uploadGJAccComment20", uACdata);
            if(res.status == 500) throw new Error("500 Error: couldn't post!");

            if(res.data.startsWith("error code")) res = await gjWReq("uploadAccountPost", `?content=${encB64(content)}&user=${str}&password=${password}`);
            if(res.status == 403) throw new Error(res.data.error);

            return res.data;
        }
}