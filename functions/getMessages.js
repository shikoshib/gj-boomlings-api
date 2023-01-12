module.exports = {
    getMessages: 
        async function(user, pass, page = 1) {
            if(!user || user == "") throw new Error("Please provide your player ID or username!");
            if(!pass || pass == "") throw new Error("Please provide your password!");
            if(Number(page) == NaN) throw new Error("The page should be a number!");
            
            const axios = require("axios");
            const {headers, server, secret} = require("../config.json");
            const {gjp} = require("../misc/gjp.js");
            const {decMsg} = require("../misc/decMsg.js");
            const { searchUsers } = require("./searchUsers.js");

            let userObj = await searchUsers(user);

            const msgData = {
                accountID: userObj.accountID,
                gjp: gjp(pass),
                secret: secret,
                page: page - 1
            }

            let res = await axios.post(server + "getGJMessages20.php", msgData, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data)
            })

            let msgs = res.data.split("|");
            let result = [];
            msgs.forEach(m => {
                result.push(decMsg(m));
            })

            return result;
        }
}