module.exports = {
    uploadMessage:
        async function(receiver, subj, content, user, pass) {
            if(!receiver) throw new Error("Please specify a message receiver!");
            if(!subj) throw new Error("Please specify a message subject!");
            if(!content) throw new Error("Please specify a message content!");
            if(!user) throw new Error("Please provide a username or a player ID!");
            if(!pass) throw new Error("Please provide a password!");

            const { gjp } = require("../misc/gjp.js");
            const { encB64 } = require("../misc/encB64.js");
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");
            
            let receiverObj = await searchUsers(receiver);
            let userObj = await searchUsers(user);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            const data = {
                accountID: userObj.accountID,
                toAccountID: receiverObj.accountID,
                gjp: gjp(pass),
                subject: encB64(subj),
                body: xor.encrypt(content, 14251),
                secret: secret
            }

            let res = await gjReq("uploadGJMessage20", data);
            if(res.data == -1) throw new Error(-1);

            if(res.data.startsWith("error code")) res = await gjWReq("uploadMessage", `?receiver=${receiver}&subject=${encB64(subj)}&content=${encB64(content)}&user=${user}&password=${pass}`)
            if(res.status == 403) throw new Error(res.data.error)

            return res.data;
        }
}