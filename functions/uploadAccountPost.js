module.exports = {
    uploadAccountPost:
        async function(content, str, password) {
            const {encB64} = require("../misc/encB64.js");
            if(!content || content == "") throw new Error("Please provide an account post content!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");
            
            const {gjReq} = require("../misc/gjReq.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();
            
            const comment = encB64(content);

            let uACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                gjp: xor.encrypt(password, 37526),
                comment: comment,
                cType: 1
            };

            let res = await gjReq("uploadGJAccComment20", uACdata);
            if(res.status == 500) throw new Error("500 Error: couldn't post!");

            return res.data;
        }
}