module.exports = {
    /**
     * Downloads the message specified by its ID.
     * @param {*} id - The message ID.
     * @param {*} user - The downloading person's player ID or username.
     * @param {*} pass - The downloading person's password.
     */
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
            let GJDecode = require("../misc/GJDecode.js");
            let {decMessage} = GJDecode();

            let userObj = await searchUsers(user);

            const data = {
                accountID: userObj.accountID,
                gjp: gjp(pass),
                secret: secret,
                messageID: id
            }

            let res = await gjReq("downloadGJMessage20", data);
            if(res.data == -1) throw new Error(-1);

            if(res.data == "error code: 1005") {
                res = await gjWReq("dlMessage", `${id}?user=${user}&password=${pass}`);
                if(res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            return decMessage(res.data);
        }
}