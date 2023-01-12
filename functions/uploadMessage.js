module.exports = {
    uploadMessage:
        async function(receiver, subj, content, user, pass) {
            if(!receiver || receiver == "") throw new Error("Please specify a message receiver!");
            if(!subj || subj == "") throw new Error("Please specify a message subject!");
            if(!content || content == "") throw new Error("Please specify a message content!");
            if(!user || user == "") throw new Error("Please provide a username or a player ID!");
            if(!pass || pass == "") throw new Error("Please provide a password!");

            const { gjp } = require("../misc/gjp.js");
            const { encB64 } = require("../misc/encB64.js");
            const axios = require("axios");
            const { headers, server, secret } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");
            
            let receiverObj = await searchUsers(receiver);
            let userObj = await searchUsers(user);

            const XOR = require("../misc/xor.js");
            const xor = new XOR();

            const uMdata = {
                accountID: userObj.accountID,
                toAccountID: receiverObj.accountID,
                gjp: gjp(pass),
                subject: encB64(subj),
                body: xor.encrypt(content, 14251),
                secret: secret
            }

            let res = await axios.post(server + "uploadGJMessage20.php", uMdata, {
                headers: headers
            }).catch(e => {
                throw new Error(e.response.data)
            });

            return 1;
        }
}