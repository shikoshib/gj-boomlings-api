module.exports = {
    uploadAccountPost:
        async function(content, str, password) {
            const {encB64} = require("../misc/encB64.js");
            if(!content || content == "") throw new Error("Please provide an account post content!");
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");
            
            const axios = require("axios");
            const { headers, server } = require("../config.json");
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

            let res = await axios.post(server + "uploadGJAccComment20.php", uACdata, {
                headers: headers
            }).catch(e => {
                if(e.response.status == 500) throw new Error("500 Error: couldn't post!");
                throw new Error(e.response.data);
            })

            return res.data;
        }
}