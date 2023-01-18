module.exports = {
    dlMessage: 
        async function(id, user, pass) {
            if(!id || id == "") throw new Error("Please provide a message ID!");
            if(Number(id) == NaN) throw new Error("The message ID should be a number!");
            if(!user || user == "") throw new Error("Please provide your player ID or username!");
            if(!pass || pass == "") throw new Error("Please provide your password!");
            
            const axios = require("axios");
            const {headers, server, secret} = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");
            const {gjp} = require("../misc/gjp.js");
            const {decMessage} = require("../misc/decMessage.js");

            let userObj = await searchUsers(user);

            const msgData = {
                accountID: userObj.accountID,
                gjp: gjp(pass),
                secret: secret,
                messageID: id
            }

            let res = await axios.post(server + "downloadGJMessage20.php", msgData, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data)
            })

            if(res.data == -1) throw new Error(-1);

            return decMessage(res.data);
        }
}