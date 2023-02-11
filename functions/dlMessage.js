module.exports = {
    dlMessage: 
        async function(id, user, pass) {
            if(!id) throw new Error("Please provide a message ID!");
            if(Number(id) == NaN) throw new Error("The message ID should be a number!");
            if(!user) throw new Error("Please provide your player ID or username!");
            if(!pass) throw new Error("Please provide your password!");
            
            const {gjReq} = require("../misc/gjReq.js");
            const {gjWReq} = require("../misc/gjWReq.js");
            const {secret} = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");
            const {gjp} = require("../misc/gjp.js");
            const {decMessage} = require("../misc/decMessage.js");

            let userObj = await searchUsers(user);

            const data = {
                accountID: userObj.accountID,
                gjp: gjp(pass),
                secret: secret,
                messageID: id
            }

            let res = await gjReq("downloadGJMessage20", data);
            if(res.data == -1) throw new Error(-1);

            if(res.data.startsWith("error code")) {
                res = await gjWReq("dlMessage", `${id}?user=${user}&password=${pass}`);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            return decMessage(res.data);
        }
}